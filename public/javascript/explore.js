var cb = cb || {};

(function (explore) {
  //get dom els ?
  
  explore.getById = function(id) {
    if (!id) {
      // todo: get the first one 
      id = cb.strip.order[cb.strip.order.length - 1];   
    }
    
    //  Go to strip 
    cb.strip.goTo(id, cb.media.ready);
      
  };
      
})(cb.explore = cb.explore || {});