let fs = require('fs')
let antlr4 = require('antlr4')
let CSVLexer = require('./CSVLexer')
let CSVParser = require('./CSVParser')
let myParser = null

fs.readFile(
  'data.csv', { encoding: 'utf-8' },
  (error, data) => {
    if (error) {
      console.log(error)
    } else {
      testCSVgrammar(data)
    }
  }
)

const testCSVgrammar = function(fileInput) {
  let chars = new antlr4.CharStreams.fromString(fileInput)
  let lexer = new CSVLexer.CSVLexer(chars)
  let tokens = new antlr4.CommonTokenStream(lexer)
  let parser = new CSVParser.CSVParser(tokens)
  parser.buildParseTrees = true
  let tree = parser.file()
}
