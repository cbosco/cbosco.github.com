fs = require "fs"
md_text = "**bold** *italic* [link](http://www.neti.ee) `code block`"
md_parser = require("node-markdown").Markdown

outputFile = (fileName) ->
	file = fs.readFileSync "work/#{fileName}", 'utf8'
#	console.log md_parser(file)
	console.log file

files = fs.readdirSync("work")

console.log files

outputFile file for file in files
