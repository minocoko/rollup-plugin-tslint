import path from 'path'
import fs from 'fs'
import ts from 'typescript'
import { createFilter } from 'rollup-pluginutils'
import { Linter, Configuration } from 'tslint'

function normalizePath (id) {
  return path.relative(process.cwd(), id).split(path.sep).join('/')
}

function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

export default function tslint (options = {}) {
  let linter;

  const filter = createFilter(
    options.include,
    options.exclude || 'node_modules/**'
  )

  // formatter: "stylish"
  // rulesDirectory: null,
  // formattersDirectory: "customFormatters/"

  const tsConfigSearchPath = options.tsConfigSearchPath || process.cwd()
  const tsConfigFile = ts.findConfigFile(tsConfigSearchPath, ts.sys.fileExists)

  const config = {
    fix: options.fix || false,
    formatter: options.formatter || 'stylish',
    formattersDirectory: options.formattersDirectory || null,
    rulesDirectory: options.rulesDirectory || null
  }

  return {
    name: 'tslint',
    sourceMap: false,

    options() {
      const program = Linter.createProgram(tsConfigFile)

      linter = new Linter(config, program)
    },

    transform (code, id) {
      const fileName = normalizePath(id)
      if (!filter(id)) {
        return null
      }

      const configuration = (options.configuration === null ||
        options.configuration === undefined ||
        isString(options.configuration))
        ? Configuration.findConfiguration(options.configuration || null, fileName).results
        : Configuration.parseConfigFile(options.configuration, process.cwd())

      linter.lint(id, code, configuration)
      const result = linter.getResult()

      // Clear all results for current file from tslint
      linter.failures = [];
      linter.fixes = [];

      if (result.errorCount || result.warningCount) {
        console.log(result.output)

        if (options.throwError) {
          throw Error('Warnings or errors were found')
        }
      }
    }
  }
}
