###
Two files for project:
	* YYYY-project-name.md (description body in markdown)
	* YYYY-project-name.json (project metadata)

Will create static HTML where ID/link corresponds to project-name
###


fs = require "fs"
eco = require "eco"
md_parser = require("node-markdown").Markdown

# for jQuery data info...
# TODO: deprecate
buildRolesString = (roles) ->
	rolesString = ""
	if roles
		if roles["design"]
			rolesString += ",Design"
		if roles["client-side"]
			rolesString += ",Client-side development"
		if roles["server-side"]
			rolesString += ",Server-side development"

	rolesString

addFileToWorkCollection = (fileName) ->
	fileName = fileName.toLowerCase()
	isJSON = false
	isMD = false
	existingItem

	# read file
	file = fs.readFileSync "#{__dirname}/work/#{fileName}", 'utf8'


	# skip vim swap files
	if fileName.indexOf(".swp") isnt -1
		return

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
			file.rolesString = buildRolesString file.roles
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

# render templates
headerTemplate = fs.readFileSync "#{__dirname}/work/header.html.eco", "utf-8"
navTemplate = fs.readFileSync "#{__dirname}/work/nav.html.eco", "utf-8"
footerTemplate = fs.readFileSync "#{__dirname}/work/footer.html.eco", "utf-8"
slidesTemplate = fs.readFileSync "#{__dirname}/work/slides.html.eco", "utf-8"
payload =	{
				"projects" : work
			}
html = ""
# header (static)
html += eco.render headerTemplate
html += eco.render navTemplate, payload
# nav item
# page item
# footer (static)
html += eco.render footerTemplate
html += eco.render slidesTemplate, payload
#html += eco.render "work/footer.eco"
#
console.log html
