import buble from 'rollup-plugin-buble'

const pkg = require('./package.json')

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      dest: pkg['main']
    },
    {
      format: 'es',
      dest: pkg['module']
    }
  ],
  plugins: [
    buble()
  ],
  external: Object.keys(pkg.dependencies).concat(['path', 'fs']),
  sourceMap: 'inline'
}
