const assert = require('assert');
const { rollup } = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const tslint = require('../');
const commonjs = require('rollup-plugin-commonjs');
const { createFormatter } = require('./util/formatter');

process.chdir('test');

describe('rollup-plugin-tslint', () => {
	it('space indentation expected (indent)', () => {
		let result = {};
		return rollup({
			input: 'fixtures/indent.ts',
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
			input: 'fixtures/success.ts',
			plugins: [
				tslint()
			]
		});
	});

	it('should ignore node_modules with exclude option', () => {
		return rollup({
			input: 'fixtures/modules.ts',
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

	it('should fail with enabled throwOnError option', () => {
		return rollup({
			input: 'fixtures/indent.ts',
			plugins: [
				tslint({
					throwOnError: true,
					formatter: createFormatter()
				})
			]
		}).then(() => {
			assert.fail('should throw error');
		}).catch(err => {
			console.error(err);
			assert.notEqual(err.toString().indexOf('Errors were found'), -1);
		});
	});

	it('should fail with enabled throwOnError option', () => {
		return rollup({
			input: 'fixtures/warning.ts',
			plugins: [
				tslint({
					throwOnWarning: true,
					formatter: createFormatter()
				})
			]
		}).then(() => {
			assert.fail('should throw error');
		}).catch(err => {
			console.error(err);
			assert.notEqual(err.toString().indexOf('Warnings were found'), -1);
		});
	});

	it('should fail with enabled throwOnError option', () => {
		return rollup({
			input: 'fixtures/warning.ts',
			plugins: [
				tslint({
					throwOnError: true,
					throwOnWarning: true,
					formatter: createFormatter()
				})
			]
		}).then(() => {
			assert.fail('should throw error');
		}).catch(err => {
			console.error(err);
			assert.notEqual(err.toString().indexOf('Warnings or errors were found'), -1);
		});
	});
	
	it('should detect the violation with the type checker', () => {
		let result = {};
		return rollup({
			input: 'fixtures/typechecking.ts',
			plugins: [
				tslint({ formatter: createFormatter(result) })
			]
		}).then(() => {
			assert.equal(result.count, 1);
			assert.equal(result.failure, 'Operands of \'+\' operation must either be both strings or both numbers');
			assert.equal(result.ruleName, 'restrict-plus-operands');
		});
	});

	it('should be able to take an alternative configuration file', () => {
		let result = {};
		return rollup({
			input: 'fixtures/typechecking.ts',
			plugins: [
				tslint({ formatter: createFormatter(result), configuration: "alternative-tsconfig.json" })
			]
		}).then(() => {
			assert.equal(result.count, 1);
			assert.equal(result.failure, 'tab indentation expected');
			assert.equal(result.ruleName, 'indent');
		});
	});

	it('should be able to take an inline configuration', () => {
		let result = {};
		return rollup({
			input: 'fixtures/typechecking.ts',
			plugins: [
				tslint({ 
					formatter: createFormatter(result), 
					configuration: {
						rules: {
							indent: {
								options: ["tabs"]
							}   
						}
					} 
				})
			]
		}).then(() => {
			assert.equal(result.count, 1);
			assert.equal(result.failure, 'tab indentation expected');
			assert.equal(result.ruleName, 'indent');
		});
	});
});
