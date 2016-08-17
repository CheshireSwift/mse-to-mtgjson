'use strict'

var _ = require('lodash')

function stripTags(xml) {
  return xml.replace(/<\/?[\w-]+?>/g, '')
}

function card(mseCard) {
  var colorIdentity = _.filter(mseCard['casting cost'], c => c.match(/[WUBRG]/))
  return {
    artist: mseCard['illustrator'],
    cmc: mseCard['casting cost'].length,
    colorIdentity,
    colors: _.map(colorIdentity, c => ({ W: 'White', U: 'Blue', B: 'Black', R: 'Red', G: 'Green' }[c])),
    imageName: mseCard['image'],
    layout: 'normal',
    manaCost: '{' + mseCard['casting cost'].split('').join('}{') + '}',
    name: mseCard['name'],
    power: '' + mseCard['power'],
    rarity: _.capitalize(mseCard['rarity']),
    subtypes: mseCard['sub type'].split(' '),
    text: stripTags(mseCard['rule text']).trim(),
    toughness: '' + mseCard['toughness'],
    type: stripTags(mseCard['super type']) + ' \u2014 ' + mseCard['sub type'],
    types: [stripTags(mseCard['super type'])]
  }
}

module.exports = { card }

