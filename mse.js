'use strict'

var _ = require('lodash')

const KEY_VALUE_REGEX = /^\s*(\w+):\s*(\w+)$/
const CONTAINER_REGEX = /^\s*(\w+):\s*$/

function parse(mseString) {
  var mseJson = mseToJson(mseString)
  try {
   return JSON.parse(mseJson)
  } catch (e) {
    e.message += ` -- JSON follows:\n${mseJson}`
    throw e
  }
}

function mseToJson(mseString) {
  var lines = mseString.trim().split('\n')
  var previousDepth = -1
  var jsonLines =_.map(lines, function(line) {
    var depth = _(line).split('').takeWhile(char => char === '\t').size()

      var leadChars = function(depth, previousDepth) {
        switch (true) {
          case depth > previousDepth:
            return '{'
          case depth < previousDepth:
            return '},'
          default:
            return ','
        }
      }(depth, previousDepth)

      previousDepth = depth

      var jsonLine
      var match
      if (match = new RegExp(KEY_VALUE_REGEX).exec(line)) {
        jsonLine = `"${match[1]}": "${match[2]}"`
      } else if (match = new RegExp(CONTAINER_REGEX).exec(line)) {
        jsonLine = `"${match[1]}":`
      }

      return leadChars + jsonLine
  })

  return jsonLines.join('') + _.repeat('}', previousDepth + 1)
}

module.exports = { parse }

