#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const os = require('os')
const debug = require('./index').createDebugger()

const argv = require('yargs')
  .usage('Usage: $0 [-c <config file>] <css files...>')
  .demand(1)
  .alias('c', 'config')
  .default('c', '.postcss.js')
  .nargs('c', 1)
  .describe('c', 'Config file specifying the postcss plugins to use')
  .help('?')
  .alias('?', 'help')
  .argv

const destFilePath = path.join(os.tmpdir(), 'postcss-debugged.css')

const config = require(path.join(process.cwd(), argv.config))
const processor = debug(config(postcss))

let donePromise = Promise.resolve()

argv._.forEach(cssFilePath => {
  donePromise = donePromise.then(() =>
    processor.process(fs.readFileSync(cssFilePath), { from: cssFilePath, to: destFilePath })
  )
})

donePromise
.then(() => {
  debug.inspect()
})
.catch(error => {
  console.error(error.stack)
})
