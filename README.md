# rollup-plugin-tslint 

[![Travis Build Status][travis-img]][travis]

[travis-img]: https://travis-ci.org/minocoko/rollup-plugin-tslint.svg
[travis]: https://travis-ci.org/minocoko/rollup-plugin-tslint
[rollup]: https://github.com/rollup/rollup
[tslint-config]: https://palantir.github.io/tslint/usage/configuration
[eslint]: https://github.com/TrySound/rollup-plugin-eslint

[Rollup] plugin to verify entry point and all imported files with TSLint.
influe


## Install

```sh
npm i rollup-plugin-tslint -D
```


## Usage

```js
import { rollup } from 'rollup';
import tslint from 'rollup-plugin-tslint';

rollup({
    entry: 'main.js',
    plugins: [
        tslint({ /* your options */ })
    ]
});
```


## Options

See more options here [tslint-config].

### throwError

Type: `boolean`  
Default: `false`

If true, will throw an error if any warnings or errors were found.

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


# License

MIT © [Minocoko](mailto:minocok@outlook.com)

# Acknowledges
Initially this plugin were influenced by [eslint], thanks a lot.