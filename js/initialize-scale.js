'use strict';

window.initializeScale = (function () {
  var setResizeValue = function (button, number, action) {
    button.addEventListener('click', function (evt) {
      var elem = evt.target;
      var value = number.getAttribute('value');
      if (elem === document.querySelector('.upload-resize-controls-button-dec')) {
        if (value <= 100 && value > 25) {
          value = +value - 25;
          number.setAttribute('value', value);
          action(value);
        }
      } else if (elem === document.querySelector('.upload-resize-controls-button-inc')) {
        if (value < 100 && value >= 25) {
          value = +value + 25;
          number.setAttribute('value', value);
          action(value);
        }
      }
    });
  };
  return {
    setSize: function (button, value, action) {
      setResizeValue(button, value, action);
    }
  };
})();
