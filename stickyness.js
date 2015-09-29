(function() {
  if (!window.FA) window.FA = {};

  FA.Nav = {
    
    tbState : my_getcookie('toolbar_state'),
    offset : {},
    
    visible : true,
    checkState : function() {
      if (!FA.Nav.animating) {
        var visible = FA.Nav.barStatic.getBoundingClientRect().bottom <= FA.Nav.offset.bottom;
      
        if (visible && FA.Nav.barSticky.style.top != FA.Nav.offset.top) {
          FA.Nav.barSticky.style.top = FA.Nav.offset.top;
          FA.Nav.visible = true;
        } else if (!visible && FA.Nav.barSticky.style.top != '-30px') {
          FA.Nav.barSticky.style.top = '-30px';
          FA.Nav.visible = false;
        }
      }
    },
    
    animating : false,
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
  
  FA.Nav.offset = FA.Nav.tbState == 'hidden' ? { bottom : 0, top : '0px' } : { bottom : 30, top : '31px' };

  $(function() {
    var head = document.getElementById('page-header');

    if (head) {
      FA.Nav.barStatic = head.lastChild.firstChild.firstChild.nextSibling;
      if (FA.Nav.barStatic) {
        FA.Nav.barSticky = FA.Nav.barStatic.cloneNode(true);
        FA.Nav.barSticky.className = 'fa_sticky_nav';
        FA.Nav.barSticky.style.top = '-30px';
        document.body.appendChild(FA.Nav.barSticky);

        window.onscroll = FA.Nav.checkState;
        FA.Nav.checkState();
        
        $(function() {
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
