#global / window
cb = @cb or {}
explore = cb.explore = {}

# get dom els ?

explore.getById = (id) ->
	if not id
		# TODO: get the first one 
		id = cb.strip.order[cb.strip.order.length - 1]
    
	# Go to strip 
	cb.strip.goTo id, cb.media.ready
      
# Globals
module?.exports  = cb
