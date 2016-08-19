var chai = require('chai')
var expect = chai.expect


describe('the MSE format reader', () => {
  var mse = require('../mse')

  it('handles a couple of Space cards and keywords', () => {
    expect(mse.parse(`
card:
	has styling: false
	notes: 
	time created: 2016-04-01 19:52:00
	time modified: 2016-04-23 23:39:46
	name: Incubation Hulk
	casting cost: 5GG
	type symbol: creature
	image: image31
	super type: <word-list-type>Unit</word-list-type>
	sub type: Mutant
	rarity: rare
	rule text: When <atom-cardname><nospellcheck>Incubation Hulk</nospellcheck></atom-cardname> falls, put three 2/2 green Mutant unit tokens into the warzone with “When this unit falls, put three 1/1 green Mutant unit tokens into the warzone.”
	flavor text: <i-flavor></i-flavor>
	power: 4
	toughness: 4
	illustrator: José Arias
	copyright: 
	image 2: 
	copyright 2: 
card:
	has styling: false
	notes: 
	time created: 2016-04-16 22:41:04
	time modified: 2016-05-15 01:52:41
	name: Experimental Serum
	casting cost: 2G
	type symbol: sorcery
	image: image242
	super type: <word-list-type>Edict</word-list-type>
	sub type: 
	rarity: uncommon
	rule text:
		Put two +1/+1 counters on target unit.
		<kw-A><i-auto><nospellcheck>Xenophile</nospellcheck></i-auto></kw-A> — Whenever a unit you control that’s a Mutant or a Xeno enters or leaves the warzone, you may pay <sym-auto>1G</sym-auto>. If you do, return <atom-cardname><nospellcheck>Experimental Serum</nospellcheck></atom-cardname> from your scrapheap to your hand.
	flavor text: <i-flavor></i-flavor>
	illustrator: Vitaly S. Alexius
	copyright: 
	image 2: 
	copyright 2: 
keyword:
	keyword: Innervate
	match: Innervate
	reminder: Damage this unit deals also causes you to gain that much command.
	rules: 
	mode: custom
keyword:
	keyword: Orbital
	match: Orbital
	reminder: This unit can’t be intercepted by and prevent all combat damage that would be dealt to this unit by units without flight, orbital, or rocketry.
	rules: 
	mode: custom
    `)).to.eql({
      cards: [{
        "casting cost": "5GG",
        "copyright": null,
        "copyright 2": null,
        "flavor text": "<i-flavor></i-flavor>",
        "has styling": false,
        "illustrator": "José Arias",
        "image": "image31",
        "image 2": null,
        "name": "Incubation Hulk",
        "notes": null,
        "power": 4,
        "rarity": "rare",
        "rule text": "When <atom-cardname><nospellcheck>Incubation Hulk</nospellcheck></atom-cardname> falls, put three 2/2 green Mutant unit tokens into the warzone with “When this unit falls, put three 1/1 green Mutant unit tokens into the warzone.”",
        "sub type": "Mutant",
        "super type": "<word-list-type>Unit</word-list-type>",
        "toughness": 4,
        "time created": new Date('2016-04-01T19:52:00.000Z'),
        "time modified": new Date('2016-04-23T23:39:46.000Z'),
        "type symbol": "creature"
      }, {
        "casting cost": "2G",
        "copyright": null,
        "copyright 2": null,
        "flavor text": "<i-flavor></i-flavor>",
        "has styling": false,
        "illustrator": "Vitaly S. Alexius",
        "image": "image242",
        "image 2": null,
        "name": "Experimental Serum",
        "notes": null,
        "rarity": "uncommon",
        "rule text": "Put two +1/+1 counters on target unit.\n<kw-A><i-auto><nospellcheck>Xenophile</nospellcheck></i-auto></kw-A> — Whenever a unit you control that’s a Mutant or a Xeno enters or leaves the warzone, you may pay <sym-auto>1G</sym-auto>. If you do, return <atom-cardname><nospellcheck>Experimental Serum</nospellcheck></atom-cardname> from your scrapheap to your hand.\n",
        "sub type": null,
        "super type": "<word-list-type>Edict</word-list-type>",
        "time created": new Date('2016-04-16T22:41:04.000Z'),
        "time modified": new Date('2016-05-15T01:52:41.000Z'),
        "type symbol": "sorcery"
      }],
      "keywords": [{
        "keyword": "Innervate",
        "match": "Innervate",
        "mode": "custom",
        "reminder": "Damage this unit deals also causes you to gain that much command.",
        "rules": null
      }, {
        "keyword": "Orbital",
        "match": "Orbital",
        "mode": "custom",
        "reminder": "This unit can’t be intercepted by and prevent all combat damage that would be dealt to this unit by units without flight, orbital, or rocketry.",
        "rules": null
      }]
    })
  })
})

