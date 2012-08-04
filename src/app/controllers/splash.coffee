# constants
FADE_SPEED = 200
AUTO_INTERVAL = 4000
items = []
itemsLength = 0
currentIndex = 0
autoRotateTimer = null
      
goToMedia = (newIndex) ->
	items.eq(currentIndex).fadeOut FADE_SPEED, 'linear', -> 
		items.eq(newIndex).fadeIn FADE_SPEED, 'linear', ->
			currentIndex = newIndex;

rotate = ->
	console.log "in rotate"
	newIndex
	if (currentIndex < (itemsLength - 1))
		newIndex = currentIndex + 1;
	else
		newIndex = 0;

	goToMedia newIndex
  
decorate = (el) ->
	items = el.find 'li'
	itemsLength = items.length
	if (itemsLength <= 1)
		false # no need to decorate

	currentIndex = 0

	items.show().slice(1).hide()
	autoRotateTimer = window.setInterval rotate, AUTO_INTERVAL
  
init = ->
	decorate $('.work')
  
$(document).ready init

