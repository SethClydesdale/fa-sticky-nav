# FA Sticky Nav

This is a sticky navigation developed for the support forums of forumactif, but can be used by others as well. The current setup is for version phpbb3, but the target node can be changed for each version.

## Installing

If you don't know what a sticky nav is, it's a navbar that sticks to the top of the screen when the static navbar is scrolled out of view. It makes navigating websites a whole lot easier. A small example :
![preview](http://i21.servimg.com/u/f21/18/21/41/30/captur78.png)

Anyway, to install this plugin go to your Admin Panel, then Modules > JS codes management and create a new script with the following settings.

**Title :** fa_sticky_nav

**Placement :** In all the pages

Then paste the [raw source](https://raw.githubusercontent.com/SethClydesdale/fa-sticky-nav/master/stickyness.js) into the textarea and submit.

Depending on your forum version replace ``#page-header .navlinks`` in ``targetNode`` by one of the following selector sets.

**PHPBB2 :** ``.bodyline > table + table`` 

**PHPBB3 :** Leave it as is.

**PUNBB :** ``#pun-navlinks``

**INVISION :** ``#submenu``


So it has the correct style, you need to install the CSS via Display > Colors > CSS stylesheet. The CSS can be found [here](https://raw.githubusercontent.com/SethClydesdale/fa-sticky-nav/master/sticky_style.css).
