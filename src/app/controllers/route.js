var cb = cb || {};

(function(route) {

    var _url,
        _prev,
        _queue = [];

    route.defaultUrl = 'explore/';

    // Call the appropriate function on the appropriate object
    var onHashChange = function(e) {
        var newUrl,
            handled = false;

        if (e) {
            newUrl = e.fragment;
        } else {
            newUrl = $.param.fragment();
        }
        newUrl = newUrl.toLowerCase().replace(/^\//, '');

        if (_url !== newUrl) {
            _prev = _url;
            _url = newUrl ? newUrl : route.defaultUrl;
            var params = _url.split('/');
            var controllerName = params.shift();
            var actionName = params.shift();

            // bootstrap any shortened URLs
            //  #/explore/item-name pattern
            if (controllerName === 'explore'
                && actionName !== 'all') {
              params.push(actionName);
              actionName = 'getById';
            }
            
            // Get the appropriate object
            var controller = cb[controllerName];
            if (controller) {

                // Get the appropriate function
                var action = controller[actionName];
                if (action) {
                    if (!cb.strip.isAnimating) {
                      action.apply(controller, params);
                    } else {
                      cb.strip.reset(function() {
                        action.apply(controller, params);
                      })
                    }
                    //  either way, it matched a successful route
                    handled = true;
                }
            }
        }
        if (!handled && cb.msgPanel) {
            cb.msgPanel.show();
        }
    };

    // Return the current URL
    route.getCurrentUrl = function() {
        return _url;
    };

    // Return the previous URL
    route.getPreviousUrl = function() {
        return _prev;
    };

    // Call the next queued action once transitions complete
    route.next = function() {
        if (_queue.length) {
            _queue[0].call();
            _queue.pop(0);
        }
    };

    // Wire the hashchange function and call on document ready
    $(window).bind('hashchange', onHashChange);
    $(document).ready(function() {
        onHashChange();
    });

})(cb.route = cb.route || {});
