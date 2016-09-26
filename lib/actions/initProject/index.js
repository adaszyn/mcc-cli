const fs = require("fs");
const join = require("path").join;
const config = require("../../config")
const directoryUtil = require("../../util/directoryUtil")
const InitProject = {
    action: (cwd = process.cwd()) => {
        if (directoryUtil.isValidMccProjectPath(cwd)) {
            console.log("Project already initialized!")
        } else {
            console.log("Initializing new mmc project!")
            fs.writeFileSync(join(cwd, config.smartmccFileName), new Buffer(0));
        }
    }
};

module.exports = InitProject;
