var join = require('path').join;
var fs = require('fs');
var path = require('path');
var mock = require('mock-fs');
var expect = require('chai').expect;

var directoryUtil = require('../lib/util/directoryUtil');
require('mocha');

var SMART_MCC_FILENAME = require("../lib/config").smartmccFileName;

const mockFileSystem = {
    'path': {
        'to': {
            'fake': {
                'dir': {}
            },
            ".smartmcc": new Buffer(JSON.stringify({
                defaultRoleId: "defaultRoleId123:ndjasndla2k13nwk1l"
            }, null, 2)),
        }
    }
};

function createTempDirectory() {
    mock(mockFileSystem);
}

describe("directoryUtil.directoryStructureToObject", () => {
    let startPath;
    before(() => {
        startPath = process.cwd();
        createTempDirectory();
    });
    beforeEach(() => { process.chdir(startPath) })
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
        createTempDirectory();
        process.chdir("path/to/fake/dir");
    });

    it(".getMccProjectRootDirectory() should return path for project", () => {
        expect(directoryUtil.getMccProjectRootDirectory()).to.equal(path.join(process.cwd(), "../.."));
    })

    it(".getMccConfigObject() should return parsed config file", () => {
        expect(directoryUtil.getMccConfigObject()).be.a('object');
    });

    it("Should determine if cwd is a child of smart-mcc project", () => {
        expect(
            directoryUtil.isValidMccProjectPath(process.cwd())
        ).be.true;
    });

    after(() => {
        mock.restore();
    });
});
