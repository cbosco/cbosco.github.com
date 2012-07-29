###
Two files for project:
	* YYYY-project-name.md (description body in markdown)
	* YYYY-project-name.json (project metadata)

Will create static HTML where ID/link corresponds to project-name
###


fs = require "fs"
md_parser = require("node-markdown").Markdown

addFileToWorkCollection = (fileName) ->
	fileName = fileName.toLowerCase()
	isJSON = false
	isMD = false
	existingItem

	# read file
	file = fs.readFileSync "work/#{fileName}", 'utf8'

	# trim off year and first hyphen
	# after file is retrieved from filesystem
	fileName = fileName.substring 5

	# determine if file is markdown or JSON metadata
	if fileName.indexOf(".json") isnt -1
		isJSON = true
		fileName = fileName.split(".json")[0]
	else if fileName.indexOf(".md") isnt -1
		isMD = true
		fileName = fileName.split(".md")[0]
	
	for item in work
		if (item.id is fileName)
			existingItem = item
			break

	if existingItem
		if isJSON
			file = JSON.parse file
			file.body = existingItem.body
			existingItem = file
		else if isMD
			existingItem.body = md_parser file
	else
		if isJSON
			file = JSON.parse file
			file.id = fileName
			work.push file
		else if isMD
			newItem = {
				id: fileName
				body: md_parser file
			}
			work.push newItem

files = fs.readdirSync("work")

work = []

addFileToWorkCollection file for file in files

#for item in work
#	console.log item.id
