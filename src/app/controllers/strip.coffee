#global / window
cb = @cb or {}
strip = cb.strip = {}
#TODO: require jquery
$strip = $('#strip')
$slideViewport = $('#slide-viewport')
slides = $strip.find '.slide'
stripWidth = slides.length * window.innerWidth
slideWidth = stripWidth / slides.length
prevLink = $('.prev')
nextLink = $('.next')
randomLink = $('.random')

#constants
CHROME_HIDE_SPEED = 90
CHROME_SHOW_SPEED = 400
STRIP_ANIMATE_SPEED = 800

slideMap = {}
  
strip.isAnimating = false
strip.order = []

strip.goTo = (id, callback, wait) ->
	newSlide = slideMap[id]
	strip.isAnimating = true

	if newSlide
		disableLink prevLink
		disableLink nextLink
		if not wait
			callback newSlide
	  
		$strip.show()
		# go to left position
		$strip.animate(
			{
				left: -newSlide.left + 'px'
			}
			STRIP_ANIMATE_SPEED
			'easeInOutQuad'
			->
				if strip.isAnimating
				# set prev/next link href's
					if newSlide.prevUrl
						enableLink(prevLink, newSlide.prevUrl);

					if newSlide.nextUrl
						enableLink(nextLink, newSlide.nextUrl);

				# get random link
				enableLink randomLink, getRandom(id)
				strip.isAnimating = false
				if wait
					callback newSlide
		)

strip.reset = (callback) ->
	strip.isAnimating = false
	$(':animated').stop true, true
	callback()
  
enableLink = (link, url, time = CHROME_SHOW_SPEED) ->
	link
		.attr('href', '#/explore/' + url)
		.fadeIn(time)
  
disableLink = (link, time = CHROME_HIDE_SPEED) ->
	link.fadeOut(time)
  
getRandom = (id) ->
	max = strip.order.length
	random = Math.floor(Math.random() * max)
	randomId = strip.order[random]
		
	if randomId == id
		# try one greater
		randomId = strip.order[random+1]
		if not randomId
			# try one smaller
			randomId = strip.order[random-1]

	randomId
  
init = ->
	# TODO: maybe put in a spinner ?
  
    # start on window.onload (images)
    $slideViewport.css 'width', slideWidth + 'px'
    $strip.css 'width', stripWidth + 'px'
    $strip.css 'left', -stripWidth + 'px'
    slides.css 'width', slideWidth + 'px'

	# build slide map
	slides.each (i, el) ->
		prevUrl = null
		nextUrl = null

		if slides[i-1]
			prevUrl = slides[i-1].id

		if slides[i+1]
			nextUrl = slides[i+1].id

		slideMap[el.id] =
			'el'      : $(el)
			'left'    : i * slideWidth
			'prevUrl' : prevUrl
			'nextUrl' : nextUrl

		strip.order.push el.id

	max = cb.strip.order.length
	random = Math.floor(Math.random() * max)
	id = cb.strip.order[random]

	$strip.show()
  
init()
