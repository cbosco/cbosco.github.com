var cb = cb || {};

(function (strip) {
  var $strip = $('#strip'),
      $slideViewport = $('#slide-viewport'),
      slides = $strip.find('.slide'),
      stripWidth = slides.length * window.innerWidth,
      slideWidth = stripWidth / slides.length,
      prevLink = $('.prev'),
      nextLink = $('.next'),
      randomLink = $('.random'),
      
      CHROME_HIDE_SPEED = 90,
      CHROME_SHOW_SPEED = 400,
      STRIP_ANIMATE_SPEED = 800,
      
      slideMap = {};
  
  strip.isAnimating = false;
  strip.order = [];

  strip.goTo = function(id, callback, wait) {
    strip.isAnimating = true;
    var newSlide = slideMap[id];
    if (newSlide) {
      disableLink(prevLink);
      disableLink(nextLink);
      if (!wait) {
        callback(newSlide);
      }
      $strip.show();
      // go to left position
      $strip.animate({left: -newSlide.left + 'px'}, STRIP_ANIMATE_SPEED, 'easeInOutQuad', function() {
        if (strip.isAnimating) {
          // set prev/next link href's
          if (newSlide.prevUrl) {
            enableLink(prevLink, newSlide.prevUrl);
          }
          if (newSlide.nextUrl) {
            enableLink(nextLink, newSlide.nextUrl);
          }
        }
        // get random link
        enableLink(randomLink, getRandom(id));
        strip.isAnimating = false;
        if (wait) {
          callback(newSlide);
        }
      });
    };
  };
  
  strip.reset = function(callback) {
    strip.isAnimating = false;
    $(':animated').stop(true, true);
    callback();
  };
  
  var enableLink = function(link, url, time) {
    link.attr('href', '#/explore/' + url).fadeIn(time || CHROME_SHOW_SPEED);
  };
  
  var disableLink = function(link, time) {
    link.fadeOut(time || CHROME_HIDE_SPEED);
  };
  
  var getRandom = function(id) {
    var max = strip.order.length,
        random = Math.floor(Math.random() * max),
        randomId = strip.order[random];
        
    if (randomId == id) {
      // try one greater
      randomId = strip.order[random+1];
      if (!randomId) {
        // try one smaller
        randomId = strip.order[random-1];  
      }
    }
    return randomId;
  }
  
  var init = function() {
    //maybe put in a spinner ?
  
  
    //start on window.onload (images)
    $slideViewport.css('width', slideWidth + 'px');
    $strip.css('width', stripWidth + 'px')
    $strip.css('left', -stripWidth + 'px');
    slides.css('width', slideWidth + 'px');

    //build slide map
    slides.each(function(i, el) {
      var prevUrl = null,
          nextUrl = null;
        
      if (slides[i-1]) {
        prevUrl = slides[i-1].id;
      }
      if (slides[i+1]) {
        nextUrl = slides[i+1].id;
      }
    
      slideMap[el.id] = {
        'el'      : $(el),
        'left'    : i * slideWidth,
        'prevUrl' : prevUrl,
        'nextUrl' : nextUrl
      };
      strip.order.push(el.id);
    });

    var max = cb.strip.order.length,
        random = Math.floor(Math.random() * max),
        id = cb.strip.order[random];

    $strip.show();
  
  };
  
  init();

  

})(cb.strip = cb.strip || {});