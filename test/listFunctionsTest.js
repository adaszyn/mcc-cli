const {action, getAllFunctions} = require("../lib/actions/listFunctions");
const directoryUtil = require("../lib/util/directoryUtil")
const mock = require("mock-fs");
const config = require("../lib/config");
const expect = require("expect.js");

require("mocha");

const dirStructure = {
    "a": {
        "b": {
            "c": {

            }
        }
    }
}

const testModuleNames = [
    "testModuleName1",
    "baz",
    "bar",
    "foo"
];

function prepDirectory() {
    dirStructure[config.smartmccFileName] = "";
    testModuleNames.map((moduleName) => dirStructure[`${moduleName}${config.moduleSuffix}`] = {})

    mock(dirStructure);
}

describe("ListFunctions action", () => {

    before(() => {
        prepDirectory();
    });

    it("Should list all functions in current dir", () => {
        const functionNames = getAllFunctions();
        testModuleNames.map((testModuleName) =>
            expect(functionNames.includes(testModuleName + config.moduleSuffix)).to.equal(true)
        )

    })
});
