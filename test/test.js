const assert = require('assert');
const { rollup } = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const tslint = require('../');
const Linter = require("tslint");
const commonjs = require('rollup-plugin-commonjs');
const { createFormatter } = require('./util/formatter');

process.chdir('test');


describe('rollup-plugin-tslint', () => {
	it('space indentation expected (indent)', () => {
		let result = {};
		return rollup({
			entry: 'fixtures/indent.ts',
			plugins: [
				tslint({ formatter: createFormatter(result) })
			]
		}).then(() => {
			assert.equal(result.count, 1);
			assert.equal(result.failure, 'space indentation expected');
			assert.equal(result.ruleName, 'indent');
		});
	});

	it('should not fail with default options', () => {
		return rollup({
			entry: 'fixtures/success.ts',
			plugins: [
				tslint()
			]
		});
	});

	it('should ignore node_modules with exclude option', () => {
		return rollup({
			entry: 'fixtures/modules.ts',
			external: ['path', 'fs'],
			plugins: [
				nodeResolve({ jsnext: true }),
				commonjs(),
				tslint({
					exclude: '../node_modules/**'
				})
			]
		});
	});

	it('should fail with enabled throwError option', () => {
		return rollup({
			entry: 'fixtures/indent.ts',
			plugins: [
				tslint({
					throwError: true,
					formatter: createFormatter()
				})
			]
		}).then(() => {
			assert.fail('should throw error');
		}).catch(err => {
			assert.notEqual(err.toString().indexOf('Warnings or errors were found'), -1);
		});
	});

	it('should detect the violation with the type checker', () => {
		let result = {};
		return rollup({
			entry: 'fixtures/typechecking.ts',
			plugins: [
				tslint({ formatter: createFormatter(result) })
			]
		}).then(() => {
			assert.equal(result.count, 1);
			assert.equal(result.failure, 'Operands of \'+\' operation must either be both strings or both numbers');
			assert.equal(result.ruleName, 'restrict-plus-operands');
		});
	});
});
