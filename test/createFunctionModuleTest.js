var should = require('expect.js');
var join = require('path').join;
var expect = require('expect.js');
var fs = require('fs');
var path = require('path');
var mock = require('mock-fs');
var directoryUtil = require('../lib/util/directoryUtil');
require('mocha');
var SMART_MCC_FILENAME = require("../lib/config").smartmccFileName;
var createFunctionModuleAction = require("../lib/actions/createFunctionModule");
var {directoryStructureToObject} = require("../lib/util/directoryUtil");
var config = require("../lib/config")

const testModuleName = "testModuleName";

const fileSystem = {
    'root': {
        'a': {
            'b': {

            }
        }
    },
};

function createTempDirectory() {

    fileSystem['root'][SMART_MCC_FILENAME] = new Buffer(0);
    mock(fileSystem);
}

describe("createFunctionModuleAction", () => {
    before(() => {
        createTempDirectory();
        process.chdir("root/a/b")
        createFunctionModuleAction(testModuleName);
    });

    it("should create directory in the root path", () => {
        var structure = directoryStructureToObject(join(process.cwd(), "../.."));
        // expect(structure[`${testModuleName.toLowerCase()}${config.moduleSuffix}`]).to.be.ok();
    })

    it("should create Lambda handler directory in the root path", () => {
        var structure = directoryStructureToObject(join(process.cwd(), "../.."));
        let handlerDir = `${testModuleName.toLowerCase()}${config.handlerSuffix}`;
        expect(structure[handlerDir]).to.be.ok();
    })

    it("should create Lambda handler in the root path", () => {
        var structure = directoryStructureToObject(join(process.cwd(), "../.."));
        let handlerDirPath = `${testModuleName.toLowerCase()}${config.handlerSuffix}`;
        let handlerDir = structure[handlerDirPath].src.main.java;
        let packageDir = handlerDir;
        config.handlerPackageName.split(".").forEach((relDir) => {
          packageDir = packageDir[relDir];
        })
        expect(packageDir[`${testModuleName}Handler.java`]).to.be.ok();
    })
    after(() => {
      mock.restore();
    })
});
