const directoryUtil = require("./directoryUtil");
const join = require("path").join;
const fs = require('fs');
const errorMessages = require("../errorMessages");
const config = require('../config');

const GradleUtil = {
    getMainSettingsFile: (cwd = process.cwd()) => {

    },
    appendModuleToMainProject: (functionName) => {
        const rootDir = directoryUtil.getMccProjectRootDirectory();
        if (!fs.existsSync(join(rootDir, "settings.gradle")))
            throw new Error(errorMessages.SETTINGS_GRADLE_NOT_EXISTS)
        const fileContent = fs.readFileSync(join(rootDir, "settings.gradle"));

        const regex = / *include .*/g;
        const includeStatement = regex.exec(fileContent)[0];

        const modules = GradleUtil.includeStateMentToModuleArray(includeStatement);
        if (!modules.includes(functionName)) {
            modules.push(functionName);
        }
        const newIncludeStmt = GradleUtil.moduleArrayToIncludeStatement(modules);
        const newFileContent = fileContent.toString().replace(includeStatement, newIncludeStmt);
        fs.writeFileSync(join(rootDir, "settings.gradle"), newFileContent)
    },
    includeStateMentToModuleArray: (includeStatement) => {
        return includeStatement
            .replace(/include|\'| |:/g, "")
            .split(',');
    },
    moduleArrayToIncludeStatement: (modules) => {
        const moduleIteration = modules
            .reduce((prev, curr, index) => (index !== modules.length - 1 ? prev + "':" + curr + "', " : prev + "':" + curr + "'"), "");
        return `include ${moduleIteration}`;
    }
}

module.exports = GradleUtil;
