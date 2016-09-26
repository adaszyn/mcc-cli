const Lambda = require('aws-sdk').Lambda;
const directoryUtil = require("../../util/directoryUtil");
const join = require('path').join;
const CONFIG = require("../../config");
const fs = require('fs');
const errorHandler = require("../../util/errorHandler");
const errorMessages = require("../../errorMessages");
const AWS = require("aws-sdk");

// TODO: config update from .aws/config
// TODO: add command-line loader for config

AWS.config.update({region:'us-east-1'});


const CreateLambdaFunction = {
    action: (functionName) => {
        const projectPath = directoryUtil.getMccProjectRootDirectory();
        const functionPath = join(projectPath, functionName.toLowerCase() + CONFIG.handlerSuffix);
        const zipFilePath = join(functionPath, CONFIG.functionDistDir, functionName.toLowerCase() + CONFIG.handlerSuffix + ".zip");

        if (!fs.existsSync(functionPath))
            errorHandler(errorMessages.FUNCTION_NOT_EXISTS);

        if (!fs.existsSync(zipFilePath))
            errorHandler(errorMessages.FUNCTION_HANDLER_NOT_BUILT);
        CreateLambdaFunction.uploadLambdaFunction(functionName, zipFilePath);
    },
    uploadLambdaFunction: (functionName, zipPath, role) => {
        const fileContents = fs.readFileSync(zipPath);
        const mccconfig = directoryUtil.getMccConfigObject();
        const lambda = new Lambda();
        var params = {
            Code: { /* required */
                ZipFile: fileContents
            },
            FunctionName: functionName,
            Handler: CONFIG.handlerPackageName + "." + functionName + "Handler",
            Role: role || mccconfig.defaultRoleId,
            Runtime: 'java8',
            Publish: true || false
        };
        lambda.createFunction(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });
    }
}

module.exports = CreateLambdaFunction;
