var join = require('path').join;
var fs = require('fs');
var path = require('path');
var mock = require('mock-fs');
var expect = require('chai').expect;
const CONFIG = require("../lib/config");
var directoryUtil = require('../lib/util/directoryUtil');
require('mocha');

var SMART_MCC_FILENAME = require("../lib/config").smartmccFileName;

const testModuleName = "FooBar";
const mockFileSystem = {
        'temp_root': {
            '1': {
                '11': {}
            },
            "dirToDelete": {
              "someFile": new Buffer(1024),
              "someDir": {}
            },
            [`${testModuleName}${CONFIG.moduleSuffix}`]: {},
            ".smartmcc": new Buffer(JSON.stringify({
                defaultRoleId: "defaultRoleId123:ndjasndla2k13nwk1l"
            }, null, 2)),
        }
};

function createTempDirectory() {
    mock(mockFileSystem);
}

describe("directoryUtil.directoryStructureToObject", () => {
    let startPath;
    before(() => {
        startPath = process.cwd();
        rootPath = join(process.cwd(), "temp_root");
        createTempDirectory();
    });
    beforeEach(() => {
        process.chdir(startPath)
    })
    it("create object from file dir structure", () => {
        var directoryStructure = directoryUtil.directoryStructureToObject("");
        expect(mockFileSystem).to.deep.eql(directoryStructure);
    });
    after(() => {
        mock.restore();
    });
});

describe("directoryUil", () => {
    before(() => {

    });
    beforeEach(() => {
        createTempDirectory();
        process.chdir(rootPath);
    });

    it(".getMccProjectRootDirectory() should return path for project", () => {
        process.chdir(join(rootPath, "1", "11"));
        expect(directoryUtil.getMccProjectRootDirectory()).to.equal(path.join(process.cwd(), "../.."));
    });

    it(".getMccConfigObject() should return parsed config file", () => {
      process.chdir(join(rootPath, "1", "11"));
        expect(directoryUtil.getMccConfigObject()).be.a('object');
    });

    it("Should determine if cwd is a child of smart-mcc project", () => {
      process.chdir(join(rootPath, "1", "11"));
        expect(
            directoryUtil.isValidMccProjectPath(process.cwd())
        ).be.true;
    });

    it(".getFunctionDirectoryPath should return path if function exists", () => {
        process.chdir(join(rootPath));
        const actual = join(process.cwd(), `${testModuleName}${CONFIG.moduleSuffix}`);
        const expected = directoryUtil.getFunctionDirectoryPath(testModuleName);
        expect(actual).to.eql(expected);

    })

    it(".getFunctionDirectoryPath should null if function does not exist", () => {
      const nonExisitngDirectory = "HelloWorld";
      const expected = directoryUtil.getFunctionDirectoryPath(nonExisitngDirectory);
      expect(expected).to.eql(null);
    })

    it(".deleteDirectory should completely remove directory", (done) => {
        expect(fs.existsSync(join(rootPath, "dirToDelete"))).to.be.true;
        directoryUtil.deleteDirectory(join(rootPath, "dirToDelete"))
          .then(() => {
            expect(fs.existsSync(join(rootPath, "dirToDelete"))).to.be.false;
            done();
          }
        )
    });

    afterEach(() => {
        mock.restore();
    });
});
