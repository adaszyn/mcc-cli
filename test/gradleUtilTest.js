var join = require('path').join;
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var mock = require('mock-fs');
var directoryUtil = require('../lib/util/directoryUtil');
var gradleUtil = require('../lib/util/gradleUtil');
const CONFIG = require("../lib/config");
require('mocha');

var SMART_MCC_FILENAME = require("../lib/config").smartmccFileName;

const getBaseMockFileSystem = () => ({
    'root': {
        ".smartmcc": new Buffer(JSON.stringify({
            defaultRoleId: "defaultRoleId123:ndjasndla2k13nwk1l"
        }, null, 2)),
        "settings.gradle": new Buffer("include ':app', ':mobile-cloud-computing-library'")
    }
});

function createTempDirectory(schemaObject) {
    mock(schemaObject);
}

describe("gradleUtil", () => {
    let mockFileSystem = null;
    const startPath = join(process.cwd(), "root");

    beforeEach(() => {
      mockFileSystem = getBaseMockFileSystem();
      createTempDirectory(mockFileSystem);
      process.chdir(startPath)
    })

    it(".appendModuleToMainProject should append function module to settings.gradle", () => {
        const moduleName = "Test1234";
        let directoryStructure = directoryUtil.directoryStructureToObject("");
        const oldSettings = directoryStructure['settings.gradle'];
        gradleUtil.appendModuleToMainProject(moduleName);
        directoryStructure = directoryUtil.directoryStructureToObject('');
        const newSettings = directoryStructure['settings.gradle'];
        expect(newSettings.toString().includes(oldSettings.toString())).to.be.true;
    });

    it(".includeStateMentToModuleArray should convert include statement string to array of module names", () => {
      const testModules = ["lorem", "ipsum"];
      const testIncludeStatement = `include :${testModules[0]}, :${testModules[1]}`;
      const modules = gradleUtil.includeStateMentToModuleArray(testIncludeStatement);
      expect(modules).to.eql(testModules);
    });

    it(".moduleArrayToIncludeStatement should transform array of modules into include statement", () => {
      const testModules = ["lorem", "ipsum"];
      const includeStatement = gradleUtil.moduleArrayToIncludeStatement(testModules);
      expect(includeStatement).to.eql(`include ':${testModules[0]}', ':${testModules[1]}'`)
    }),

    it(".moduleArrayToIncludeStatement should throw error on settings missing", () => {
        const wrongFileSystem = getBaseMockFileSystem();
        delete wrongFileSystem.root['settings.gradle'];
        createTempDirectory(wrongFileSystem);
        expect(gradleUtil.appendModuleToMainProject.bind(null, "LOREM IPSUM")).to.throw(Error);
    });

    it(".extractIncludeStatementsFromString should return single return aray", () => {
        let includeStatement = `include :'hello', :'world'`;
        let testSettingsGradleContent = `Lorem ipsum\n${includeStatement}\nfoo foo bar\n`;
        const statement = gradleUtil.extractIncludeStatementsFromString(testSettingsGradleContent)
        expect(statement).to.be.a("string");
        expect(testSettingsGradleContent.indexOf(includeStatement)).to.be.above(-1);

    });

    it(".getMainSettingsContent should return settings.gradle file content", () => {
        const content = gradleUtil.getMainSettingsContent();
        expect(content).to.eql(mockFileSystem.root["settings.gradle"]);
    });

    it(".removeModuleToMainProject should should remove elem from settings.gradle", () => {
        let modulesSettings = mockFileSystem.root[`${CONFIG.settingsGradleFileName}`].toString();
        const newModule = 'FooBar';
        const newModulesSettings = modulesSettings + `, ':${newModule}_smarttask', ':${newModule}_smarttask:handler'`;
        mockFileSystem.root[`${CONFIG.settingsGradleFileName}`] = newModulesSettings;
        gradleUtil.removeModuleToMainProject(newModule);
        const content = gradleUtil.getMainSettingsContent().toString();
        expect(content).to.eql(modulesSettings);
    });

    afterEach(() => {
        mock.restore();
    });
});

describe("directoryUil", () => {
});
