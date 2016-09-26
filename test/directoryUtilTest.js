var should = require('expect.js');
var join = require('path').join;
var expect = require('expect.js');
var fs = require('fs');
var path = require('path');
var mock = require('mock-fs');
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
    before(() => {
        createTempDirectory();
    });
    it("create object from file dir structure", () => {
        var directoryStructure = directoryUtil.directoryStructureToObject('');
        expect(mockFileSystem).to.eql(directoryStructure);
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
        expect(directoryUtil.getMccConfigObject()).to.be.ok();
    });

    it("Should determine if cwd is a child of smart-mcc project", () => {
        expect(
            directoryUtil.isValidMccProjectPath(process.cwd())
        ).to.be(true);
    });

    after(() => {
        mock.restore();
    });
});
