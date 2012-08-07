#global / window
cb = @cb or {}
media = cb.media = {}

# constants
FADE_SPEED = 200
AUTO_INTERVAL = 25000
DROP_CONTROL_TIMEOUT = 600
  
pagination = null
nextHtml = '<span class="media-next"><b></b>Next</span>'
prevHtml = '<span class="media-prev"><b></b>Prev</span>'
positionHtml = '<span class="media-position-dot">&bull;</span>'
positionWrapHtml = '<div class="media-position" />'

items = []
positions = []
itemsLength = 0
currentIndex = 0
direction = true
autoRotateTimer = null
dropControlTimer = null

goToMedia = (newIndex) ->
	if typeof newIndex isnt 'number'
		# newIndex is an event
		newIndex = $(newIndex.target).index()

	positions.eq(currentIndex).removeClass('active')
	items.eq(currentIndex).fadeOut(
		FADE_SPEED
		'linear'
		->
			items.eq(newIndex).fadeIn(
				FADE_SPEED
				'linear'
				->
					positions.eq(newIndex).addClass 'active'
					currentIndex = newIndex
			)
	)

rotate = ->
	newIndex = 0
	if direction  # forward
		if currentIndex < (itemsLength - 1)
			newIndex = currentIndex + 1
		else
			newIndex = 0

	else # backward
		if currentIndex > 0
			newIndex = currentIndex - 1
		else
			newIndex = itemsLength - 1

	goToMedia newIndex

getPositions = ->
	html = ''
	for item in items
		html += positionHtml

	positions = $(html)
	positions.eq(0).addClass 'active'
	positions

decorate = (el) ->
	window.clearInterval autoRotateTimer
	window.clearTimeout dropControlTimer
	items = el.find('li')
	itemsLength = items.length
	if itemsLength <= 1
		false # no need to decorate

	# reset
	if items
		items.show()

	currentIndex = 0
	direction = true
	el.unbind 'mousenter mouseleave'

	items.show().slice(1).hide()
	autoRotateTimer = window.setInterval rotate, AUTO_INTERVAL

	if not pagination # build html
		pagination = $('<div style="display:none;"/>')
		next = $(nextHtml).bind 'click', ->
			direction = true
			rotate()
			window.clearInterval autoRotateTimer

		pagination.bind 'mouseenter', ->
			window.clearTimeout dropControlTimer

		prev = $(prevHtml).bind 'click', ->
			direction = false
			rotate()
			window.clearInterval autoRotateTimer

		pagination.data 'pageContainer', $(positionWrapHtml)
		pagination
			.append(prev)
			.append(next)
			.append(pagination.data('pageContainer'))
			.delegate '.media-position-dot', 'click', goToMedia
	else
		pagination.detach().hide()

	pagination.data('pageContainer').html(getPositions())

	el.append(pagination)
		.bind 'mouseenter', ->
			pagination.fadeIn FADE_SPEED
			window.clearTimeout dropControlTimer
		.bind 'mouseleave', ->
			dropControlTimer = window.setTimeout(
				-> pagination.fadeOut(FADE_SPEED)
				DROP_CONTROL_TIMEOUT
			)
	true

media.ready = (container) ->
	decorate container.el.find('.media-showcase')

# Globals
module?.exports  = cb
