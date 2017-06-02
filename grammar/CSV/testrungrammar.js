let fs = require('fs')

fs.readFile(
  'data.csv', { encoding: 'utf-8' },
  (error, data) => {
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }
)

// let input = "your text to parse here"
// let chars = CharStreams.fromString(input);
// let lexer = new MyGrammarLexer.MyGrammarLexer(chars);
// let tokens  = new antlr4.CommonTokenStream(lexer);
// let parser = new MyGrammarParser.MyGrammarParser(tokens);
// parser.buildParseTrees = true;
// let tree = parser.MyStartRule();

