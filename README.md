# rollup-plugin-tslint 

[![Build][travis-img]][travis]
[![Coverage][coveralls-img]][coveralls]
[![JavaScript Style Guide][standard-img]][standard]
[![Downloads][rollup-plugin-tslint-dt-img]][rollup-plugin-tslint-pkg]
[![Version][rollup-plugin-tslint-v-img]][rollup-plugin-tslint-pkg]
[![Dependency][dependency-img]][dependency]
[![DevDependency][devDependency-img]][dependency]

[travis-img]: https://travis-ci.org/minocoko/rollup-plugin-tslint.svg
[travis]: https://travis-ci.org/minocoko/rollup-plugin-tslint
[coveralls-img]: https://coveralls.io/repos/github/minocoko/rollup-plugin-tslint/badge.svg
[coveralls]: https://coveralls.io/github/minocoko/rollup-plugin-tslint
[standard-img]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard]: https://standardjs.com
[rollup-plugin-tslint-pkg]: https://www.npmjs.com/package/rollup-plugin-tslint
[rollup-plugin-tslint-dt-img]: https://img.shields.io/npm/dt/rollup-plugin-tslint.svg
[rollup-plugin-tslint-v-img]: https://img.shields.io/npm/v/rollup-plugin-tslint.svg
[dependency]: https://david-dm.org/minocoko/rollup-plugin-tslint
[dependency-img]: https://david-dm.org/minocoko/rollup-plugin-tslint/status.svg
[devDependency-img]: https://david-dm.org/minocoko/rollup-plugin-tslint/dev-status.svg
[rollup]: https://github.com/rollup/rollup
[tslint-config]: https://palantir.github.io/tslint/usage/configuration
[rollup-plugin-eslint]: https://github.com/TrySound/rollup-plugin-eslint

[Rollup] plugin to verify entry point and all imported files with TSLint.


## Install

```sh
yarn add rollup-plugin-tslint -D
```

or 

```sh
npm i rollup-plugin-tslint -D
```


## Usage

```js
import typescript from 'rollup-plugin-typescript';
import tslint from "rollup-plugin-tslint";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/main.js",
    format: "cjs"
  },
  plugins: [
    tslint({}),
    typescript({ })
  ]
};

```


## Options

See more options here [tslint-config].

### throwOnError

Type: `boolean`  
Default: `false`

If true, will throw an error if any errors were found.

### throwOnWarning

Type: `boolean`  
Default: `false`

If true, will throw an error if any warnings were found.

### include

Type: `array` or `string`  
Default: `[]`

A single file, or array of files, to include when linting.

### exclude

Type: `array` or `string`  
Default: `node_modules/**`

A single file, or array of files, to exclude when linting.

### formatter

Type: `function` or `string`  
Default: `stylish`

Custom error formatter or the name of a built-in formatter.

### configuration

Type: `object` or `string`
Default: `null`

Full configuration can be provided either as a path to a `tsconfig.json` or a configuration object.


# License

MIT © [Minocoko](mailto:minocoko@outlook.com)

# Acknowledges
Initially this plugin were inspired by [rollup-plugin-eslint], thanks a lot.