const program = require('commander');
const createFunctionModuleAction = require('./actions/createFunctionModule');
const listFunctionsAction = require('./actions/listFunctions');
const initProject = require("./actions/initProject");
const createLambdaFunction = require("./actions/createLambdaFunction");
const deleteFunction = require("./actions/deleteFunction");
const updateLambdaFunction = require("./actions/updateLambdaFunction");
const buildFunction = require("./actions/buildFunction");
const version = require("../package.json").version;

program
  .version(version);

program
  .command('create <name>')
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
  .option('-m, --max_memory [memory]', 'Maximum memory to be use during execution')
  .option('-t, --timeout [timeout]', 'Timeout value')
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

program
  .command('*')
  .action(() => { console.log('Wrong command. Use --help to get information about possible options.'); });
program.parse(process.argv);
