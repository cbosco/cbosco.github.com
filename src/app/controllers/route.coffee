#global / window
cb = @cb or {}
route = cb.route = {}

_url = null
_prev = null
_queue = []

route.defaultUrl = 'explore/'

# Call the appropriate function on the appropriate object
onHashChange = (e) ->
	newUrl = null
	handled = false

	console.log "HELLLO DERE"
	if e
		newUrl = e.fragment
	else
		newUrl = $.param.fragment()	# polyfill

	newUrl = newUrl.toLowerCase().replace /^\//, ''

	if _url isnt newUrl
		_prev = _url
		_url = newUrl or route.defaultUrl

		params = _url.split('/')
		controllerName = params.shift()
		actionName = params.shift()

		# bootstrap any shortened URLs
		#  #/explore/item-name pattern
		if controllerName is 'explore' and actionName isnt 'all'
			params.push actionName
			actionName = 'getById'
		
		# Get the appropriate object
		controller = cb[controllerName]
		if controller
			# Get the appropriate function
			action = controller[actionName]
			if action
				if not cb.strip.isAnimating
				  action.apply controller, params
				else
					cb.strip.reset ->
						action.apply controller, params
				# either way, it matched a successful route
				handled = true

	if not handled and cb.msgPanel
		cb.msgPanel.show()


# Return the current URL
route.getCurrentUrl = ->
	_url

# Return the previous URL
route.getPreviousUrl = ->
	_prev


# Call the next queued action once transitions complete
route.next = ->
	if _queue.length
		_queue[0].call()
		_queue.pop(0)

# Wire the hashchange function and call on document ready
# TODO: require jQuery
$(window).bind 'hashchange', onHashChange
$(document).ready ->
	onHashChange()

# Globals
module?.exports  = cb
