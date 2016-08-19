'use strict'

var _ = require('lodash')

const TYPES = [
  'Artifact',
  'Conspiracy',
  'Creature',
  'Enchantment',
  'Instant',
  'Land',
  'Phenomenon',
  'Plane',
  'Planeswalker',
  'Scheme',
  'Sorcery',
  'Tribal',
  'Vanguard',
  'Development',
  'Device',
  'Edict',
  'Organization',
  'Unit'
]

const SUPERTYPES = [
  'Basic',
  'Elite',
  'Legendary',
  'Ongoing',
  'Snow',
  'World',
  'Distinguished',
  'Tactical'
]

function stripTags(xml) {
  return xml.replace(/<\/?[\w-]+?>/g, '')
}

function card(mseCard) {
  var manaSymbols = _.filter(mseCard['casting cost'], c => c.match(/[WUBRG]/))
  var types = stripTags(mseCard['super type']).split(' ')
  return _.pickBy({
    artist: mseCard['illustrator'],
    cmc: manaSymbols.length + _.toNumber(('' + mseCard['casting cost']).match(/^\d*/)),
    colorIdentity: _.uniq(manaSymbols),
    colors: _(manaSymbols).uniq().map(c => ({ W: 'White', U: 'Blue', B: 'Black', R: 'Red', G: 'Green' }[c])).value(),
    imageName: mseCard['image'],
    layout: 'normal',
    manaCost: '{' + ('' + mseCard['casting cost']).split('').join('}{') + '}',
    name: mseCard['name'],
    power: mseCard['power'] != undefined && '' + mseCard['power'],
    rarity: _.startCase(mseCard['rarity']) || 'Common',
    subtypes: mseCard['sub type'] && mseCard['sub type'].split(' '),
    supertypes: _.intersection(types, SUPERTYPES),
    text: stripTags(mseCard['rule text']).trim(),
    toughness: mseCard['toughness'] && '' + mseCard['toughness'],
    type: type(),
    types: _.intersection(types, TYPES),
  }, field => _.isNumber(field) || !_.isEmpty(field))

  function type() {
    return stripTags(mseCard['super type']) +
      (mseCard['sub type'] ? ' \u2014 ' + mseCard['sub type'] : '')
  }
}

module.exports = { card }

