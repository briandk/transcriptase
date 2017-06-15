// Generated from CSV.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by CSVParser.
function CSVListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

CSVListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
CSVListener.prototype.constructor = CSVListener;

// Enter a parse tree produced by CSVParser#file.
CSVListener.prototype.enterFile = function(ctx) {
	console.log("Entered File!")
};

// Exit a parse tree produced by CSVParser#file.
CSVListener.prototype.exitFile = function(ctx) {
};


// Enter a parse tree produced by CSVParser#hdr.
CSVListener.prototype.enterHdr = function(ctx) {
};

// Exit a parse tree produced by CSVParser#hdr.
CSVListener.prototype.exitHdr = function(ctx) {
};


// Enter a parse tree produced by CSVParser#row.
CSVListener.prototype.enterRow = function(ctx) {
};

// Exit a parse tree produced by CSVParser#row.
CSVListener.prototype.exitRow = function(ctx) {
};


// Enter a parse tree produced by CSVParser#field.
CSVListener.prototype.enterField = function(ctx) {
};

// Exit a parse tree produced by CSVParser#field.
CSVListener.prototype.exitField = function(ctx) {
};



exports.CSVListener = CSVListener;