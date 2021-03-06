#!/usr/bin/node

var program = require('commander')
var _ = require('lodash')

var mse = require('./mse')
var converter = require('./converter')

program
  .version('1.0.0')
  .option('-l, --line [line]', 'Specify a line to read rather than piping in')
  .option('-t, --tidy', 'Just tidy input into YAML (no parsing)')
  .option('-j, --json', 'Just parse input into JSON (no conversion)')
  .option('-p, --pretty', 'Pretty print JSON output')
  .parse(process.argv)

var JSONout = input => JSON.stringify(input, null, program.pretty && 2)

var method =
  program.tidy ? mse.tidy :
  program.json ? _.flow(mse.parse, JSONout) :
  input => JSONout(_.map(mse.parse(input).cards, converter.card))

if (program.line) {
  process.stdout.write(method(program.line))
  return
}

var pipedInput = ''
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', data => pipedInput += data)
process.stdin.on('end', () => process.stdout.write(method(pipedInput)))

