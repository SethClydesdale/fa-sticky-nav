(function() {
  if (!window.FA) window.FA = {};

  FA.Nav = {
    
    tbState : my_getcookie('toolbar_state'), // toolbar state
    offset : {}, // sticky nav offsets
    
    visible : false, // sticky nav is visible
    
    // check the state of the static nav
    checkState : function() {
      if (!FA.Nav.animating) {
        var hidden = FA.Nav.barStatic.getBoundingClientRect().bottom <= FA.Nav.offset.bottom;
      
        if (hidden && FA.Nav.barSticky.style.top != FA.Nav.offset.top) {
          FA.Nav.barSticky.style.top = FA.Nav.offset.top;
          FA.Nav.visible = true;
        } else if (!hidden && FA.Nav.barSticky.style.top != '-30px') {
          FA.Nav.barSticky.style.top = '-30px';
          FA.Nav.visible = false;
        }
      }
    },
    
    animating : false, // sticky nav is animating
    
    // animate the sticky nav when the toolbar is toggled
    animate : function() {
      if (FA.Nav.visible) {
        FA.Nav.animating = true;
        FA.Nav.barSticky.style.transition = 'none';
      
        $(FA.Nav.barSticky).animate({
          top : FA.Nav.offset.top
        }, function() {
          FA.Nav.barSticky.style.transition = '';
          FA.Nav.animating = false;
          FA.Nav.checkState();
        });
      }
    }
    
  };
  
  // set default offsets based on toolbar state
  FA.Nav.offset = FA.Nav.tbState == 'fa_hide' ? { bottom : 0, top : '0px' } : { bottom : 30, top : '31px' };
  
  $(function() {
    var head = document.getElementById('page-header');

    if (head) {
      FA.Nav.barStatic = head.lastChild.firstChild.firstChild.nextSibling; // static nav
      if (FA.Nav.barStatic) {
        $(function() {
          FA.Nav.barSticky = FA.Nav.barStatic.cloneNode(true); // clone static nav
          FA.Nav.barSticky.className = 'fa_sticky_nav';
          FA.Nav.barSticky.style.top = '-30px';
          document.body.appendChild(FA.Nav.barSticky); // append the sticky one
          
          window.onscroll = FA.Nav.checkState; // check state on scroll
          FA.Nav.checkState(); // startup check
          
          // toolbar toggling
          $('#fa_hide').click(function() {
            FA.Nav.offset = { bottom : 0, top : '0px' };
            FA.Nav.animate();
          });
          
          $('#fa_show').click(function() {
            FA.Nav.offset = { bottom : 30, top : '31px' };
            FA.Nav.animate();
          });
        });
      }
    }
  });
}());
