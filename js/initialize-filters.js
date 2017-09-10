'use strict';

window.initializeFilters = (function () {
  var pickEffect = function (controls, image, controlsContainer, action) {
    controls.addEventListener('click', function (evt) {
      var elem = evt.target;
      var oldEffect = [
        'none',
        'chrome',
        'sepia',
        'marvin',
        'phobos',
        'heat',
      ];
      for (var i = 0; i < oldEffect.length; i++) {
        if (elem === document.querySelector('#upload-effect-' + oldEffect[i])) {
          var newEffect = oldEffect[i];
          action(oldEffect, newEffect);
        }
      }
      if (elem === document.querySelector('#upload-effect-' + oldEffect[0])) {
        controlsContainer.classList.add('hidden');
      }
    });
  };

  var setEffect = function (pin, line, val, image) {
    pin.addEventListener('mousedown', function (evt) {
      var sliderCoords = getCoords(line);

      var onMouseMove = function (moveEvt) {
        var newLeft = moveEvt.pageX - sliderCoords.left;
        if (newLeft < 0) {
          newLeft = 0;
        }
        var rightEdge = line.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        pin.style.left = newLeft + 'px';
        val.style.width = newLeft + 'px';
        var effectValue = (newLeft) / rightEdge;
        var oldEffect = [
          {name: 'chrome',
            value: 'grayscale(' + effectValue * 1},
          {name: 'sepia',
            value: 'sepia(' + effectValue * 1},
          {name: 'marvin',
            value: 'invert(' + effectValue * 100 + '%'},
          {name: 'phobos',
            value: 'blur(' + effectValue * 3 + 'px'},
          {name: 'heat',
            value: 'brightness(' + effectValue * 3}
        ];

        for (var i = 0; i < oldEffect.length; i++) {
          if (image.classList.contains('effect-' + oldEffect[i].name)) {
            var effect = oldEffect[i].value;
          }
          image.setAttribute('style', 'filter: ' + effect + ')');
        }
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      return false;
    });

    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };

  return {
    createEffect: function (controls, image, controlsContainer, pin, line, val, action) {
      pickEffect(controls, image, controlsContainer, action);
      setEffect(pin, line, val, image);
    }
  };
})();
