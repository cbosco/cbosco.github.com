var cb = cb || {};

(function (media) {
  // constants
  var FADE_SPEED = 200,
      AUTO_INTERVAL = 25000,
      DROP_CONTROL_TIMEOUT = 600,
      
      pagination,
      nextHtml = '<span class="media-next"><b></b>Next</span>',
      prevHtml = '<span class="media-prev"><b></b>Prev</span>',
      positionHtml = '<span class="media-position-dot">&bull;</span>',
      positionWrapHtml = '<div class="media-position" />',
      
      items,
      positions,
      itemsLength,
      currentIndex,
      direction = true,
      autoRotateTimer,
      dropControlTimer;

  var goToMedia = function(newIndex) {
    if (typeof newIndex !== 'number') {
      // newIndex is an event
      newIndex = $(newIndex.target).index();
    }
    positions.eq(currentIndex).removeClass('active');
    items.eq(currentIndex).fadeOut(FADE_SPEED, 'linear', function() {
      items.eq(newIndex).fadeIn(FADE_SPEED, 'linear', function() {
        positions.eq(newIndex).addClass('active');
        currentIndex = newIndex;
      });
    });
  };
    
  var rotate = function(){
    var newIndex;
    if (direction) {  // forward
      if (currentIndex < (itemsLength - 1)) {
        newIndex = currentIndex + 1;
      } else {
        newIndex = 0;
      }        
    } else {  // backward
      if (currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else {
        newIndex = itemsLength - 1;
      } 
    }
    
    goToMedia(newIndex);
  };
  
  var getPositions = function() {
      var html = '';
      for(var i = 0; i < itemsLength; i++) {
        html += positionHtml;
      }
      positions = $(html);
      positions.eq(0).addClass('active');
      return positions;
  };
  
  var decorate = function(el) {
    window.clearInterval(autoRotateTimer);
    window.clearTimeout(dropControlTimer);
    items = el.find('li');
    itemsLength = items.length;
    if (itemsLength <= 1) {
      return false; // no need to decorate
    }
    // reset
    if (items) {  
      items.show();
    }
    currentIndex = 0;
    direction = true;
    el.unbind('mousenter mouseleave');

    items.show().slice(1).hide();
    autoRotateTimer = window.setInterval(rotate, AUTO_INTERVAL);
    
    if (!pagination) {  // build html
      pagination = $('<div style="display:none;"/>');
      var next = $(nextHtml).bind('click', function() {
        direction = true;
        rotate();
        window.clearInterval(autoRotateTimer);
      });
      pagination.bind('mouseenter', function(e) {
          window.clearTimeout(dropControlTimer);
      });      
      var prev = $(prevHtml).bind('click', function() {
        direction = false;
        rotate();
        window.clearInterval(autoRotateTimer);
      });
      pagination.data('pageContainer', $(positionWrapHtml));     
      pagination
        .append(prev)
        .append(next)
        .append(pagination.data('pageContainer'))
        .delegate('.media-position-dot', 'click', goToMedia);
    } else {
      pagination.detach().hide();      
    }
    
    pagination.data('pageContainer').html(getPositions());
    
 
    
    el.append(pagination)
      .bind('mouseenter', function(){
        pagination.fadeIn(FADE_SPEED);
        window.clearTimeout(dropControlTimer);
    })
      .bind('mouseleave', function() {
        dropControlTimer = window.setTimeout(function() {
          pagination.fadeOut(FADE_SPEED);  
        }, DROP_CONTROL_TIMEOUT);
    });
  };
  
  media.ready = function(container) {
    decorate(container.el.find('.media-showcase'));
  };
})(cb.media = cb.media || {});