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
// FIXME: function cannot bet updated when once uploaded

AWS.config.update({
    region: 'eu-west-1'
});


const CreateLambdaFunction = {
    action: (functionName) => {
        const projectPath = directoryUtil.getMccProjectRootDirectory();
        const functionPath = join(projectPath, functionName + CONFIG.handlerSuffix);
        const zipPath = join(functionPath, CONFIG.functionDistDir, functionName + CONFIG.handlerSuffix + ".zip");

        if (!fs.existsSync(functionPath))
            errorHandler(errorMessages.FUNCTION_NOT_EXISTS);

        if (!fs.existsSync(zipPath))
            errorHandler(errorMessages.FUNCTION_HANDLER_NOT_BUILT);
        CreateLambdaFunction.uploadLambdaFunction({functionName, zipPath, update: false});
    },
    /**
     * @param {string} functionName - Name of the function
     * @param {string} zipPath - Absolute path to zip file
     * @param {string} role - Role id
     * @param {boolean} update - updateFunction if True, createFunction otherwise
     */
    uploadLambdaFunction: ({functionName, zipPath, role, update}) => {
        const fileContents = fs.readFileSync(zipPath);
        const mccconfig = directoryUtil.getMccConfigObject();
        const lambda = new Lambda();
        let createParams = {
            Code: { 
                ZipFile: fileContents
            },
            FunctionName: functionName,
            Handler: CONFIG.handlerPackageName + "." + functionName + "Handler",
            Role: role || mccconfig.defaultRoleId,
            Runtime: 'java8',
            Publish: true || false
        };
        let updateParams = {
          ZipFile: createParams.Code.ZipFile,
          FunctionName: createParams.FunctionName
        }
        awsCLIHandler = (update ? lambda.updateFunctionCode : lambda.createFunction).bind(lambda);
        let params = (update ? updateParams : createParams)
        awsCLIHandler(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else console.log(data); // successful response
        });
    }
}

module.exports = CreateLambdaFunction;
