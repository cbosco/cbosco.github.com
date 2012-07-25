var cb = cb || {};

(function(tray) {
      // constants
  var SLIDE_SPEED = 200,
      FOCUS_SPEED = 200,
      TIMER_SPEED = 600,
      
      $tray,
      $nav,
      $tray_target = $('<div class="target">&nbsp;</div>'),
      $active_project = $('<div class="tooltip" id="active-project"><div class="bd" /><b class="tail" /></div>'),
      $active_project_body,
      is_dirty = false,
      focus_timer;

  
  var hideTray = function(e) {
    if (is_dirty) {
      $nav.delay(TIMER_SPEED).slideUp(SLIDE_SPEED, 'linear', function() {
        $tray.bind('mouseenter', showTray); // debounce
      });
      $tray.unbind('mouseenter');
    }
  };
  
  var showTray = function(e) {
      $nav.delay(TIMER_SPEED).slideDown(SLIDE_SPEED, 'linear', function() {
        $tray.bind('mouseleave', hideTray); // debounce
      });
      $tray.unbind('mouseleave');
  };
 
  var focus = function(e) {
    var $this = $(this),
        direction = (e.type == 'mouseenter');
    window.clearTimeout(focus_timer);
    focus_timer = window.setTimeout(function(){
      if (direction) {
        var position = $this.position(),
            roles = '',
            bd;
        
        $.each($this.data('roles').split(','), function(i, val) {
          roles += val ? '<li>' + val + '</li>' : '';
        })
        bd =    '<h5>' + $this.attr('title') + '</h5>'
             +  '<small>' + $this.data('summary') + '</small>'
             +  '<ul>' + roles + '</ul>'
             +  '<small class="ft">' + $this.data('year') + '</small>';
        $active_project_body.html(bd);
        $active_project
          .css('left', position.left)
          .show();
      } else {
        $active_project.hide();
      }
    }, FOCUS_SPEED);      

  }
  
  var init = function () {
    $tray = $('#tray')
      .append($tray_target)
      .append($active_project);
      
    $active_project_body = $active_project.find('.bd');
     
    $nav = $tray.find('nav');
    
    $tray
      .bind('click', function(e) {
        is_dirty = true;
      })
      .bind('mouseleave', hideTray)
      .bind('mouseenter', showTray);
    
    $tray.find('a').bind('mouseenter mouseleave', focus);
    showTray();
  };

 $(document).ready(init);

})(cb.tray  = cb.tray || {});
