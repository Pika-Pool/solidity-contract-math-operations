const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Math Contract', () => {
	let MathFactory, hardhatMath;

	beforeEach(async () => {
		MathFactory = await ethers.getContractFactory('Math');
		hardhatMath = await MathFactory.deploy();
	});

	describe('Addition', () => {
		const addTests = [
			[0, 1, 1],
			[0, -1, -1],
			[5, 2, 7],
			[5, -8, -3],
			[0, 0, 0],
		];

		addTests.forEach(([a, b, result]) =>
			it(`${a} + ${b} = ${result}`, async () =>
				expect(await hardhatMath.add(a, b)).to.equal(result))
		);

		const addThrowTests = [
			[100, 32760],
			[-100, -32760],
			[-100, -32790],
			[-100, 32790],
		];

		addThrowTests.forEach(([a, b]) =>
			it(`${a} + ${b} should throw error`, () =>
				expectToThrowAsync(async () => await hardhatMath.add(a, b)))
		);
	});

	describe('Multiplication', () => {
		const multiplyTests = [
			[0, 0, 0],
			[1, 5, 5],
			[-1, -5, 5],
			[1, -1, -1],
			[-3, 4, -12],
			[-4, -5, 20],
			[4, 5, 20],
		];

		multiplyTests.forEach(([a, b, result]) =>
			it(`${a} * ${b} = ${result}`, async () =>
				expect(await hardhatMath.multiply(a, b)).to.equal(result))
		);

		const multiplyThrowTests = [
			[100, 32760],
			[-100, -32760],
			[-100, 32760],
			[-100, 32790],
			[-100, -32790],
		];

		multiplyThrowTests.forEach(([a, b]) =>
			it(`${a} * ${b} should throw error`, () =>
				expectToThrowAsync(async () => await hardhatMath.multiply(a, b)))
		);
	});

	describe('Subtraction', () => {
		const subtractTests = [
			[0, 0, 0],
			[1, 1, 0],
			[0, -1, 1],
			[0, 1, -1],
			[-4, -2, -2],
			[-4, -6, 2],
			[4, 3, 1],
			[4, 8, -4],
		];

		subtractTests.forEach(([a, b, result]) =>
			it(`${a} - ${b} = ${result}`, async () =>
				expect(await hardhatMath.subtract(a, b)).to.equal(result))
		);

		const subtractThrowTests = [
			[100, -32760],
			[-100, 32760],
			[-100, -32790],
			[-100, 32790],
		];

		subtractThrowTests.forEach(([a, b]) =>
			it(`${a} - ${b} should throw error`, () =>
				expectToThrowAsync(async () => await hardhatMath.subtract(a, b)))
		);
	});

	describe('Division', () => {
		const divideTests = [
			[0, 4, 0],
			[0, -4, 0],
			[0, 1, 0],
			[0, -4, 0],
			[5, 1, 5],
			[-5, 1, -5],
			[10, 5, 2],
			[10, -5, -2],
			[-10, 5, -2],
			[10, 10, 1],
			[-10, -10, 1],
		];

		divideTests.forEach(([a, b, result]) =>
			it(`${a} / ${b} = ${result}`, async () =>
				expect(await hardhatMath.divide(a, b)).to.equal(result))
		);

		const divideThrowTests = [
			[0, 0],
			[5, 0],
			[-5, 0],
		];

		divideThrowTests.forEach(([a, b]) =>
			it(`${a} / ${b} should throw error`, () =>
				expectToThrowAsync(async () => await hardhatMath.divide(a, b)))
		);
	});
});

async function expectToThrowAsync(func) {
	let error = null;
	try {
		await func();
	} catch (err) {
		error = err;
	}

	expect(error).to.be.an('Error');
}
