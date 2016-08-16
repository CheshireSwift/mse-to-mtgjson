var chai = require('chai')
var expect = chai.expect


describe('the MSE format reader', () => {
  var mse = require('../mse')
  it('parses "key: value"', () => {
    expect(mse.parse('a: b')).to.eql({ a: 'b' })
  })

  it('parses multiple key value pairs', () => {
    expect(mse.parse(`
a: 1
b: 2
    `)).to.eql({a: 1, b: 2})
  })

  it('parses subobjects', () => {
    expect(mse.parse(`
container:
	key: value
    `)).to.eql({ container: { key: 'value' }})
  })

  it('parses multiple subobjects', () => {
    expect(mse.parse(`
container:
	contentsA: valueA
	contentsB: valueB
    `)).to.eql({
      container: {
        contentsA: 'valueA',
        contentsB: 'valueB'
      }
    })
  })

  it('parses multiple containers', () => {
    expect(mse.parse(`
containerA:
	contentsA: valueA
containerB:
	contentsB: valueB
    `)).to.eql({
      containerA: { contentsA: 'valueA' },
      containerB: { contentsB: 'valueB' }
    })
  })

  it('handles "rules text" multiline text', () => {
    expect(mse.parse(`
card:
  rules text:
    Whenever you find an inconsistent part of the format, add one tears counter.
    Sacrifice my sanity: make this dumb nonsense work
    `)).to.eql({
      card: {
        "rules text": "Whenever you find an inconsistent part of the format, add one tears counter.\nSacrifice my sanity: make this dumb nonsense work"
      }
    })
  })
})

