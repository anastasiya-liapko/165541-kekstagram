'use strict';

window.initializeScale = (function () {
  var setResizeValue = function (button, number, action, dec, inc) {
    button.addEventListener('click', function (evt) {
      var elem = evt.target;
      var value = number.getAttribute('value');
      if (elem === dec) {
        if (value <= 100 && value > 25) {
          value = +value - 25;
          number.setAttribute('value', value);
          action(value);
        }
      } else if (elem === inc) {
        if (value < 100 && value >= 25) {
          value = +value + 25;
          number.setAttribute('value', value);
          action(value);
        }
      }
    });
  };
  return {
    setSize: setResizeValue
  };
})();
