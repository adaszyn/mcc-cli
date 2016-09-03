var program = require('commander');
var createFunctionModuleAction = require('./actions/CreateFunctionModule');

program
  .version('0.0.1')

program
  .command('create-function <name>')
  .description('create function for future smart-execution')
  .action(createFunctionModuleAction);

program.parse(process.argv);
