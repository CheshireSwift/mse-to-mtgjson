#!/usr/bin/node

var program = require('commander')

var mse = require('./mse')

program
  .version('1.0.0')
  .option('-l, --line [line]', 'Specify a line to read rather than piping in')
  .option('-t, --tidy', 'Just tidy input into YAML (no parsing)')
  .option('-j, --json', 'Just parse input into JSON (no conversion)')
  .parse(process.argv)


var method =
  program.tidy ? 'tidy' :
  program.json ? 'displayParsed' :
  'convert'

if (program.line) {
  process.stdout.write(mse[method](program.line))
  return
}

var pipedInput = ''
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', data => pipedInput += data)
process.stdin.on('end', () => process.stdout.write(mse[method](pipedInput)))

