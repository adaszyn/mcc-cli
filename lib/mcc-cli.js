const program = require('commander');
const createFunctionModuleAction = require('./actions/createFunctionModule');
const listFunctionsAction = require('./actions/listFunctions');
const initProject = require("./actions/initProject");
const createLambdaFunction = require("./actions/createLambdaFunction");

program
  .version('0.0.1')

program
  .command('create-function <name>')
  .description('create function for future smart-execution')
  .action(createFunctionModuleAction);

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

program.parse(process.argv);
