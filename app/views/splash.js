var cb = cb || {};

(function (splash) {
  // constants
  var FADE_SPEED = 200,
      AUTO_INTERVAL = 4000,
      
      items,
      itemsLength,
      currentIndex,
      autoRotateTimer;
      
  var goToMedia = function(newIndex) {
    items.eq(currentIndex).fadeOut(FADE_SPEED, 'linear', function() {
      items.eq(newIndex).fadeIn(FADE_SPEED, 'linear', function() {
        currentIndex = newIndex;
      });
    });
  };
    
  var rotate = function(){
    var newIndex;
    if (currentIndex < (itemsLength - 1)) {
        newIndex = currentIndex + 1;
    } else {
      newIndex = 0;
    }        
  
    goToMedia(newIndex);
  };
  
  
  var decorate = function(el) {
    items = el.find('li');
    itemsLength = items.length;
    if (itemsLength <= 1) {
      return false; // no need to decorate
    }
    currentIndex = 0;

    items.show().slice(1).hide();
    autoRotateTimer = window.setInterval(rotate, AUTO_INTERVAL);
  };
  
  var init = function() {
    decorate($('.work'));
  };
  
  $(document).ready(init);
  
})(cb.splash = cb.splash || {});