'use strict'

var yaml = require('yaml-js')
var _ = require('lodash')

function tidy(mseString) {
  var replacedLines = mseString.trim()
    .replace(/\t/g, '  ')
    .replace(/(\w+): ([^\w\s<]+)\s*\n/g, '$1: "$2"\n')
    .replace(/rule text:\s*\n/g, 'rule text: |\n')
    .replace(/rule text: ([^|].*)/g, 'rule text: "$1"')
    .replace(/(\w+: \w+):/g, '$1')
    .split('\n')

  var cardLines = _(replacedLines)
    .dropWhile(line => !line.startsWith('card:'))
    .dropRightWhile(line => !line.match(/^ *copyright 2:/))
    .join('\n')
    .replace(/^card:/mg, '-')

  var keywordLines = _(replacedLines)
    .dropWhile(line => !line.startsWith('keyword:'))
    .dropRightWhile(line => !line.match(/^ *mode:/))
    .join('\n')
    .replace(/^keyword:/mg, '-')

  return 'cards:\n' + cardLines + '\nkeywords:\n' + keywordLines
}

function parse(mseString) {
  return yaml.load(tidy(mseString))
}

function displayParsed(mseString) {
  return JSON.stringify(parse(mseString), null, 2)
}

function convert(mseString) {
  return JSON.stringify(parse(mseString).card, null, 2)
}

module.exports = { tidy, parse, displayParsed, convert }

