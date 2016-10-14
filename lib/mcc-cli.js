const program = require('commander');
const createFunctionModuleAction = require('./actions/createFunctionModule');
const listFunctionsAction = require('./actions/listFunctions');
const initProject = require("./actions/initProject");
const createLambdaFunction = require("./actions/createLambdaFunction");
const deleteFunction = require("./actions/deleteFunction");
const updateLambdaFunction = require("./actions/updateLambdaFunction");
const buildFunction = require("./actions/buildFunction");
const version = require("../package.json").version;


// const grantPermissions = require("./actions/grantPermissions");

program
  .version(version);

program
  .command('create-function <name>')
  .description('create function for future smart-execution')
  .action(createFunctionModuleAction.action);

  program
    .command('list-functions')
    .description('list functions')
    .action(() => listFunctionsAction.action());

  program
    .command('init')
    .description('init new mcc project')
    .action(() => initProject.action());

  program
    .command('upload <name>')
    .description('upload newly created lambda function')
    .action(createLambdaFunction.action);

  program
    .command('update <name>')
    .description('update existing lambda function')
    .action((updateLambdaFunction.action));

  program
    .command('build <name>')
    .description('build existing lambda function')
    .action((buildFunction.action));

  program
    .command('delete <name>')
    .description('delete existing lambda function')
    .action((deleteFunction.action));

  // program
  //   .command('grant <name>')
  //   .description('update existing lambda function')
  //   .action((grantPermissions.action));

program.parse(process.argv);
