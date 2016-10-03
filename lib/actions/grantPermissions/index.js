const AWS = require("aws-sdk");
const cognitoidentity = new AWS.CognitoIdentity({
    apiVersion: '2014-06-30'
});
const directoryUtil = require("../../util/directoryUtil");
const policyDocumentTpl = require("./InlinePolicyTemplate.json");
const AWSUtil = require("../../util/AWSUtil");


const GrantPermissions = {
    action: (functionName) => {
        let config = directoryUtil.getMccConfigObject();
        const roleId = config.defaultRoleId;
        const identityPoolId = config.defaultIdentityPoolId;
        AWSUtil.getFunctionConfig({functionName})
          .then((config) => ())

        // GrantPermissions.getRolesForIdentityPool({
        //     roleId,
        //     identityPoolId
        // })
    },
    getPolicyDocument: () => Object.assign({}, policyDocumentTpl
    getRolesForIdentityPool: function({
        roleId,
        identityPoolId
    }) {




        var cognitoidentity = new AWS.CognitoIdentity();

        var params = {
            IdentityPoolId: identityPoolId /* required */
        };
        cognitoidentity.getIdentityPoolRoles(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                let unauthenticatedRoleArn = data.Roles.unauthenticated;
                let unauthenticatedName = unauthenticatedRoleArn.split("/").pop();

                console.log("unauthenticated role name:", unauthenticatedName);
                var params = {
                    RoleName: unauthenticatedName
                };






            }
        });



    }
}

module.exports = GrantPermissions;
