const semver = require('semver')
const fs = require('fs')
const path = require('path')
const shell = require('shellJS')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
} else if (process.argv.length >= 3) {
  const ver = process.argv[2]
  if (semver.valid(ver) === ver) {
    // update version
    let pkg = require('../package.json')
    pkg.version = ver
    fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, '\t'), 'utf-8')

    // push to git
    if (shell.exec('git add ./ && git commit -m "update version" && git push origin').code !== 0) {
      shell.echo('Error: Git commit failed')
      shell.exit(1)
    }
  }
} else {
  console.error('version required')
}
