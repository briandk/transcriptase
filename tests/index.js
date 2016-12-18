const expect = require('chai').expect
const describe = require('mocha').describe
const it = require('mocha').it

describe('A simple test', () => {
  it('should know the value assigned to a variable', () => {
    let foo = 'bar'
    expect(foo).to.equal('bar')
  })
})
