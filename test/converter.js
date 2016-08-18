'use strict'

var chai = require('chai')
var expect = chai.expect

var testData = require('./testData')

describe('the MSE to MtG converter', () => {
  var converter = require('../converter')
  describe('#card', () => {
    it('should translate a card correctly', () => {
      var convertedCard = converter.card(testData.card.mse)
      expect(convertedCard).to.eql(testData.card.mtg)
    })

    it('should translate a gold card correctly', () => {
      var convertedCard = converter.card(testData.gold.mse)
      expect(convertedCard).to.eql(testData.gold.mtg)
    })

    it('should handle empty subtypes', () => {
      var convertedCard = converter.card(testData.sorcery.mse)
      expect(convertedCard).to.eql(testData.sorcery.mtg)
    })

    //it('should translate a colourless card (with watermark) correctly', () => {
    //})

    //it('should translate a sorcery card correctly', () => {
    //})

    //it('should translate a hybrid card correctly', () => {
    //})

    //it('should translate a gold hybrid card correctly', () => {
    //})

    //it('should handle mana costs that combine hybrid and colourless correctly', () => {
    //})

    //it('should handle colourless mana symbols', () => {
    //})

    //it('should translate a vanilla creature correctly', () => {
    //})

    //it('should handle cards without mana costs', () => {
    //})

    //it('should translate a planeswalker card correctly', () => {
    //})
  })
})


