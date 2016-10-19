const createLambdaFunction = require('../lib/actions/createLambdaFunction/index')
const expect = require('chai').expect;
describe('createLambdaFunction module', () => {
    it('.isMemorySizeValueValid should validate memory sizes', () => {
        expect(createLambdaFunction.isMemorySizeValueValid(128)).to.be.true;
        expect(createLambdaFunction.isMemorySizeValueValid(256)).to.be.true;
        expect(createLambdaFunction.isMemorySizeValueValid(15)).to.be.false;
        expect(createLambdaFunction.isMemorySizeValueValid(1536)).to.be.true;
        expect(createLambdaFunction.isMemorySizeValueValid(1537)).to.be.false;
        expect(createLambdaFunction.isMemorySizeValueValid(1536 * 2)).to.be.false;
    });
})
