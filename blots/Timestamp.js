const Quill = require('quill')
let Inline = Quill.import('blots/inline')

class TimestampBlot extends Inline {}

TimestampBlot.blotName = 'timestamp'
TimestampBlot.tagName = 'A'
TimestampBlot.className = 'timestamp'

module.exports = TimestampBlot
// TimestampBlot.blotname = 'timestamp'
// TimestampBlot.tagName = 'a'
//
// class Foo extends Link {
//   create() {
//     let x = Link.create()
//     return x
//   }
// }
//
// let testLink = Link.create()
// let testFoo = new Foo()
//
// console.log(testLink)
// console.log(testFoo)
