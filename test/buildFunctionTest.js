let BuildFunction = require("../lib/actions/buildFunction");
const directoryUtil = require("../lib/util/directoryUtil")
const mock = require("mock-fs");
const config = require("../lib/config");
const expect = require('chai').expect;

require("mocha");

const dirStructure = {
    ".smartmcc": new Buffer(JSON.stringify({
        defaultRoleId: "defaultRoleId123:ndjasndla2k13nwk1l"
    }, null, 2)),
    "settings.gradle": new Buffer("include ':app', ':mobile-cloud-computing-library'")
}

function prepDirectory() {
    mock(dirStructure);
}

describe("BuildFunction", () => {

    before(() => {
        prepDirectory();
    });

    it(".action should end on promise resolve()", (done) => {
        // preparing mock function to avoid executing gradle binary
        BuildFunction.spawnGradleCommand = () => new Promise((res, rej) => {
          setTimeout(res, 10);
          setTimeout(done, 20);
        } )
        BuildFunction.action();
    })
});
