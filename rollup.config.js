import buble from 'rollup-plugin-buble'

const pkg = require('./package.json')

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: pkg['main'],
      sourcemap: true
    },
    {
      format: 'es',
      file: pkg['module'],
      sourcemap: true
    }
  ],
  plugins: [
    buble()
  ],
  external: Object.keys(pkg.dependencies).concat(['path', 'fs'])
}
