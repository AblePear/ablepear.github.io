var aps;
if ( ! aps) aps = {};

aps.billboardBlog = function() {
	var timerId = null;
	var timeout = 7500;
	var longTimeout = 300000;
	
	
	function indexOfElementWithClass(elements, className) {
		for (var i = 0; i < elements.length; ++i) {
			var element = elements[i];
			if (Spry.Utils.hasClassName(element, className)) return i;
		}
		return -1;
	}
	
	
	function nextWrapAroundIndexOf(array, currentIndex) {
		if (currentIndex == array.length - 1) {
			return 0;
		} else {
			return currentIndex + 1;
		}
	}
	
	
	function showEntry(event) {
		window.clearTimeout(timerId);
		timerId = window.setTimeout(showNextEntry, longTimeout);
		
		Spry.$$('.entry').removeClassName('showentry');
		Spry.$$('.entrynavitem').removeClassName('active');
		
		var id = '#entry' + event.target.innerHTML;
		Spry.$$(id).addClassName('showentry');
		Spry.Utils.addClassName(event.target, 'active');
	}
	
	
	function showNextEntry() {
		var entries = Spry.$$('.entry');
		var entryNavItems = Spry.$$('.entrynavitem');
		var i = indexOfElementWithClass(entries, 'showentry');
		var entry = entries[i];
		var entryNavItem = entryNavItems[i];
		
		Spry.Utils.removeClassName(entry, 'showentry');
		Spry.Utils.removeClassName(entryNavItem, 'active');
		
		var nextI = nextWrapAroundIndexOf(entries, i);
		var nextEntry = entries[nextI];
		var nextEntryNavItem = entryNavItems[nextI];
		
		Spry.Utils.addClassName(nextEntry, 'showentry');
		Spry.Utils.addClassName(nextEntryNavItem, 'active');
		
		timerId = window.setTimeout(showNextEntry, timeout);
	}
	
	
	Spry.$$('.entrynavitem').addEventListener('click', showEntry, false);
	timerId = window.setTimeout(showNextEntry, timeout);
};

Spry.Utils.addLoadListener(aps.billboardBlog);
