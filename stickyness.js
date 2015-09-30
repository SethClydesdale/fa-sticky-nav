(function() {
  if (!window.FA) window.FA = {};

  FA.Nav = {
    
    collapsible : true, // show hide button ?
    
    offset : {}, // sticky nav offsets
    
    visible : false, // sticky nav is visible
    
    // check the state of the static nav
    checkState : function() {
      if (!FA.Nav.animating) {
        var hidden = FA.Nav.barStatic.getBoundingClientRect().bottom <= FA.Nav.offset.bottom;
      
        if (hidden && FA.Nav.barSticky.style.top != FA.Nav.offset.top) {
          if (FA.Nav.toggler) FA.Nav.toggler.style.top = '30px';
          FA.Nav.barSticky.style.top = FA.Nav.offset.top;
          FA.Nav.visible = true;
        } else if (!hidden && FA.Nav.barSticky.style.top != '-30px') {
          if (FA.Nav.toggler) FA.Nav.toggler.style.top = '-30px';
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
    },
    
    // toggle sticky navigation and remember preference via cookies
    toggle : function() {
      if (FA.Nav.barSticky.style.width == '100%') {
        my_setcookie('fa_sticky_nav', 'hidden');
        FA.Nav.barSticky.style.width = '0%';
      } else {
        my_setcookie('fa_sticky_nav', 'shown');
        FA.Nav.barSticky.style.width = '100%';
      }
      return false;
    }
    
  };
  
  // set default offsets based on toolbar state
  FA.Nav.offset = my_getcookie('toolbar_state') == 'fa_hide' ? { bottom : 0, top : '0px' } : { bottom : 30, top : '31px' };
  
  $(function() {
    var head = document.getElementById('page-header');

    if (head) {
      FA.Nav.barStatic = head.lastChild.firstChild.firstChild.nextSibling; // static nav
      if (FA.Nav.barStatic) {
        $(function() {
          FA.Nav.barSticky = FA.Nav.barStatic.cloneNode(true); // clone static nav
          FA.Nav.barSticky.id = 'fa_sticky_nav';
          FA.Nav.barSticky.style.width = my_getcookie('fa_sticky_nav') == 'hidden' ? '0%' : '100%';
          FA.Nav.barSticky.style.top = '-30px';
          
          document.body.appendChild(FA.Nav.barSticky); // append the sticky one
          
          // sticky nav toggler
          if (FA.Nav.collapsible) {
            FA.Nav.toggler = document.createElement('A');
            FA.Nav.toggler.id = 'fa_sticky_toggle';
            FA.Nav.toggler.href = '#';
            FA.Nav.toggler.style.top = '-30px';
            FA.Nav.toggler.onclick = FA.Nav.toggle;
            
            document.body.appendChild(FA.Nav.toggler);
          };
          
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
