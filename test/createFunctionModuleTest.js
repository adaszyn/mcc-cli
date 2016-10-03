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
        },
        "settings.gradle": new Buffer("include ':app', ':mobile-cloud-computing-library'")
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
        createFunctionModuleAction.action(testModuleName);
    });

    it("should create directory in the root path", () => {
        var structure = directoryStructureToObject(join(process.cwd(), "../.."));
        expect(structure[`${testModuleName}${config.moduleSuffix}`]).to.be.ok();
    })

    it("should create Lambda handler directory in the function module path", () => {
        var structure = directoryStructureToObject(join(process.cwd(), "../.."));
        let handlerDir = `${config.functionHandlerDir}`;
        let moduleName = `${testModuleName}${config.moduleSuffix}`;
        expect(structure[moduleName][handlerDir]).to.be.ok();
    })

    it("should create Lambda handler as a subproject", () => {
        var structure = directoryStructureToObject(join(process.cwd(), "../.."));
        let handlerDirPath = `${testModuleName}${config.handlerSuffix}`;
        let handlerDir = structure[`${testModuleName}${config.moduleSuffix}`][config.functionHandlerDir].src.main.java;
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
