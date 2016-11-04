const Lambda = require('aws-sdk').Lambda;
const directoryUtil = require("../../util/directoryUtil");
const join = require('path').join;
const CONFIG = require("../../config");
const fs = require('fs');
const errorHandler = require("../../util/errorHandler");
const errorMessages = require("../../errorMessages");
const AWS = require("aws-sdk");
const CreateLambdaFunction = require("../createLambdaFunction");

AWS.config.update({
    region: 'eu-west-1'
});

const UpdateLambdaFunction = {
    action: (functionName) => {
        const projectPath = directoryUtil.getMccProjectRootDirectory();
        const functionPath = join(projectPath, functionName + CONFIG.moduleSuffix);
        const zipPath = join(functionPath, CONFIG.functionDistDir, "handler.zip");
        if (!fs.existsSync(functionPath))
            errorHandler(errorMessages.FUNCTION_NOT_EXISTS);

        if (!fs.existsSync(zipPath))
            errorHandler(errorMessages.FUNCTION_HANDLER_NOT_BUILT);
        CreateLambdaFunction.uploadLambdaFunction({functionName, zipPath, update: true});
    }
}

module.exports = UpdateLambdaFunction;
