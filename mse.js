'use strict'

var yaml = require('yaml-js')

function parse(mseString) {
  var tidiedString = mseString
    .trim()
    .replace(/\t/g, '  ')
    .replace(/rules text:/g, 'rules text: |')
  return yaml.load(tidiedString)
}

module.exports = { parse }

