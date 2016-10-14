const directoryUtil = require("../../util/directoryUtil");
const config = require('../../config');
const errorHandler = require("../../util/errorHandler");
const errorMessages = require("../../errorMessages");

const ListFunctions = {
    action: (cwd = process.cwd()) => {
        try {
            ListFunctions.getAllFunctions(cwd).map((funName) => console.log(funName))
        } catch (e) {
            if (e.message === errorMessages.NOT_MCC_PROJECT)
                console.log(e.message);
            else
                errorHandler(e);
        }
    },
    getAllFunctions: (cwd = process.cwd()) => {
        let projectPath = directoryUtil.getMccProjectRootDirectory(cwd);
        if (projectPath[projectPath.length -1] !== "/")
          projectPath += "/";
        const projectStructure = directoryUtil.directoryStructureToObject(projectPath);
        let result = [];
        for (const dir in projectStructure) {
            if (dir.includes(config.moduleSuffix))
                result.push(dir.substr(0, dir.length - config.moduleSuffix.length));
        }
        return result;
    }

};

module.exports = ListFunctions;
