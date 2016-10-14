const directoryUtil = require("./directoryUtil");
const join = require("path").join;
const fs = require('fs');
const errorMessages = require("../errorMessages");
const config = require('../config');

// FIXME: Module needs general refactoring

const GradleUtil = {
    getMainSettingsContent: () => {
        const rootDir = directoryUtil.getMccProjectRootDirectory();
        if (!fs.existsSync(join(rootDir, config.settingsGradleFileName))) {
            console.log(join(rootDir, config.settingsGradleFileName));
            throw new Error(errorMessages.SETTINGS_GRADLE_NOT_EXISTS)
        }
        const fileContent = fs.readFileSync(join(rootDir, config.settingsGradleFileName));
        return fileContent;
    },
    appendModuleToMainProject: (functionName) => {
        const rootDir = directoryUtil.getMccProjectRootDirectory();
        const fileContent = GradleUtil.getMainSettingsContent();
        const includeStatement = GradleUtil.extractIncludeStatementsFromString(fileContent);

        const modules = GradleUtil.includeStateMentToModuleArray(includeStatement);
        if (!modules.includes(functionName)) {
            modules.push(functionName);
        }
        const newIncludeStmt = GradleUtil.moduleArrayToIncludeStatement(modules);
        const newFileContent = fileContent.toString().replace(includeStatement, newIncludeStmt);
        fs.writeFileSync(join(rootDir, "settings.gradle"), newFileContent)
    },
    removeModuleToMainProject: (functionName) => {
        const rootDir = directoryUtil.getMccProjectRootDirectory();
        const fileContent = GradleUtil.getMainSettingsContent();
        const includeStatement = GradleUtil.extractIncludeStatementsFromString(fileContent);
        const modules = GradleUtil.includeStateMentToModuleArray(includeStatement);
        const newModules = modules.filter((module) => !module.includes(functionName));
        const newIncludeStmt = GradleUtil.moduleArrayToIncludeStatement(newModules);
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
    },
    extractIncludeStatementsFromString: (content) => {
        const regex = / *include .*/g;
        return regex.exec(content)[0];
    }
}

module.exports = GradleUtil;
