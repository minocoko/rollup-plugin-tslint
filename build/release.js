const semver = require('semver')
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
} else if (process.argv.length >= 3) {
  const ver = process.argv[2]
  if (semver.valid(ver) === ver) {
    // switch to master && merge
    shell.exec('git checkout master && git merge dev')
    console.log('git push')

    // update version
    let pkg = require('../package.json')
    pkg.version = ver
    fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, '\t'), 'utf-8')
    console.log('update version')

    // push to git
    shell.exec('git add ./ && git commit -m "update version" && git push origin')
    console.log('git push')

    // add release tag
    shell.exec(`git tag -a v${ver} -m "release v${ver}" && git push origin v${ver}`)
    console.log('add release tag')

    shell.exec('git checkout dev && git rebase master && git push dev')

    shell.exec('npm publish')
  }
} else {
  console.error('version required')
}
