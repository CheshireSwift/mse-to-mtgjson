'use strict'

var _ = require('lodash')

function stripTags(xml) {
  return xml.replace(/<\/?[\w-]+?>/g, '')
}

function card(mseCard) {
  var colorIdentity = _.filter(mseCard['casting cost'], c => c.match(/[WUBRG]/))
  var types = stripTags(mseCard['super type']).split(' ')
  return _.pickBy({
    artist: mseCard['illustrator'],
    cmc: colorIdentity.length + _.toNumber(mseCard['casting cost'].match(/^\d*/)),
    colorIdentity,
    colors: _.map(colorIdentity, c => ({ W: 'White', U: 'Blue', B: 'Black', R: 'Red', G: 'Green' }[c])),
    imageName: mseCard['image'],
    layout: 'normal',
    manaCost: '{' + mseCard['casting cost'].split('').join('}{') + '}',
    name: mseCard['name'],
    power: '' + mseCard['power'],
    rarity: _.capitalize(mseCard['rarity']),
    subtypes: mseCard['sub type'].split(' '),
    supertypes: _.initial(types),
    text: stripTags(mseCard['rule text']).trim(),
    toughness: '' + mseCard['toughness'],
    type: stripTags(mseCard['super type']) + ' \u2014 ' + mseCard['sub type'],
    types: [_.last(types)]
  }, field => _.isNumber(field) || !_.isEmpty(field))
}

module.exports = { card }

