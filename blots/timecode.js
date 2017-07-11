const Quill = require('quill')
let Link = Quill.import('formats/link')

class TimestampBlot extends Link {
  static create(value) {
    let node = super.create(value)
    node.setAttribute('class', 'timestamp')
    return node
  }
}

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
