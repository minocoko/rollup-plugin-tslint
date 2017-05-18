const semver = require('semver')
const fs = require('fs')
const path = require('path')

if (process.argv.length >= 3) {
  const ver = process.argv[2]
  if (semver.valid(ver) === ver) {
    let pkg = require('../package.json')
    pkg.version = ver

    fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, '\t'), 'utf-8')
    console.log('update version')
  }
} else {
  console.error('version required')
}
