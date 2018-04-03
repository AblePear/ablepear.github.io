var aps;
if ( ! aps) aps = {}

aps.message = function() {
  
  function removeElement(element) {
    element.parentNode.removeChild(element);
  }
  
  
  function fadeOut(element) {
    var options = {
      duration: 2000,
      finish: removeElement,
      fps: 20,
      from: 100,
      to: 0
    };
    var fadeEffect = new Spry.Effect.Fade(element, options);
    fadeEffect.start();
  }
  
  
  function showMessage(element) {
    function hideMessage() { 
      fadeOut(element) 
    };
    
    setTimeout(hideMessage, 8000);
  }
  
  Spry.$$('.message').forEach(showMessage);
};

Spry.Utils.addLoadListener(aps.message);
