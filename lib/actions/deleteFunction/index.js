const fs = require('fs');
const yesno = require("yesno");
const directoryUtil = require("../../util/directoryUtil");
const gradleUtil = require("../../util/gradleUtil");

const DeleteFunction = {
    action: (functionName) => {
        yesno.ask("Are you sure you want to delete directory? <y/n>", true, function(ok) {
            if (ok) {
                const dirToDelete = directoryUtil.getFunctionDirectoryPath(functionName);
                directoryUtil.deleteDirectory(dirToDelete)
                    .then((data) => console.log(data))
                    .then(() => gradleUtil.removeModuleToMainProject(functionName))
                    .catch((error) => console.error(error))
                    .then(process.exit.bind(0))
            } else {
                console.log("Aborting");
                process.exit(0);
            }
        });
    }
}

module.exports = DeleteFunction;