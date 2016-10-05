const exec = require('child_process').exec;
const CONFIG = require("../../config");
const gradleCommand = CONFIG.gradleBuildCommand;
const { getMccProjectRootDirectory } = require("../../util/directoryUtil");
const join = require("path").join;
const CLIUtil = require("../../util/CLIUtil");

const BuildFunction = {
    action: (functionName) => {
        const rootDir = getMccProjectRootDirectory();
        const handlerDir = join(rootDir, functionName + CONFIG.moduleSuffix, CONFIG.functionHandlerDir);
        BuildFunction.spawnGradleCommand(handlerDir)
          .then((data) => {console.log(data)})
          .then(CLIUtil.test)
          .then(CLIUtil.stopSpinner)
          .catch((error) => {console.error()})
        CLIUtil.startSpinner();
    },
    spawnGradleCommand: (cwd = process.cwd()) => {
        return new Promise((resolve, reject) => {
            exec(gradleCommand, {
                cwd
            }, (error, stdout, stderr) => {
                if (error) {
                    reject(`exec error: ${error}`);
                }
                resolve("\nFunction successfully built");
            });
        });
    }
}

module.exports = BuildFunction;
