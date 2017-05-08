import path from 'path'
import fs from 'fs'
import { createFilter } from 'rollup-pluginutils'
import { Linter } from 'tslint'

function normalizePath (id) {
  return path.relative(process.cwd(), id).split(path.sep).join('/')
}

export default function tslint (options = {}) {
  const filter = createFilter(
    options.include,
    options.exclude || 'node_modules/**'
  )

  options.formatter = options.formatter || 'stylish'

  // formatter: "stylish"
  // rulesDirectory: null,
  // formattersDirectory: "customFormatters/"

  const linter = new Linter(options)
  const configuration = Linter.loadConfigurationFromPath(Linter.findConfigurationPath())

  return {
    name: 'tslint',
    sourceMap: false,

    transform (code, id) {
      const fileName = normalizePath(id)
      if (!filter(id)) {
        return null
      }

      const fileContents = fs.readFileSync(fileName, 'utf8')
      linter.lint(id, fileContents, configuration)
      const result = linter.getResult()

      if (result.errorCount || result.warningCount) {
        console.log(result.output)

        if (options.throwError) {
          throw Error('Warnings or errors were found')
        }
      }
    }
  }
}
