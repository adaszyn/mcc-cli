const AWS = require("aws-sdk");
const Lambda = require('aws-sdk').Lambda;
const lambda = new Lambda();
var iam = new AWS.IAM();


AWS.config.update({
    region: 'eu-west-1'
});

const AWSUtil = {
    getFunctionConfig: ({
        functionName
    }) => new Promise((resolve, reject) => {
        var params = {
            FunctionName: functionName
        };
        lambda.getFunctionConfiguration(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    }),
    putRolePolicy: ({
            roleName,
            policyDocument,
            policyName
        }) =>
        new Promise((resolve, reject) => {
            iam.putRolePolicy({
                PolicyDocument: policyDocument,
                PolicyName: PolicyName,
                RoleName: roleName
            }, function(err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        })



};

module.exports = AWSUtil;
