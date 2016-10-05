const Spinner = require('cli-spinner').Spinner;
let spinnerInstance;
const CLIUtil = {
    startSpinner: () => {
        spinnerInstance = new Spinner('processing.. %s');
        spinnerInstance.setSpinnerString('|/-\\');
        spinnerInstance.start();
    },
    stopSpinner: () => {
        spinnerInstance.stop(true);
    },
}

module.exports = CLIUtil;
