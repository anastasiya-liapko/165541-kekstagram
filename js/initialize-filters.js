'use strict';

window.initializeFilters = (function () {
  var pickEffect = function (controls, image, controlsContainer) {
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
      var newEffect;
      var changeEffect = function () {
        oldEffect.forEach(function (item, i) {
          image.classList.remove('effect-' + item);
        });
        image.style.filter = '';
        image.classList.add('effect-' + newEffect);
        controlsContainer.classList.remove('hidden');
      };
      for (var i = 0; i < oldEffect.length; i++) {
        if (elem === document.querySelector('#upload-effect-' + oldEffect[i])) {
          newEffect = oldEffect[i];
          changeEffect();
        }
      }
      if (elem === document.querySelector('#upload-effect-' + oldEffect[0])) {
        controlsContainer.classList.add('hidden');
      }
    });
  };

  var setEffect = function (pin, line, val, image) {
    pin.addEventListener('mousedown', function (evt) {
      var thumbCoords = getCoords(pin);
      var shiftX = evt.pageX - thumbCoords.left;
      var sliderCoords = getCoords(line);

      var onMouseMove = function (moveEvt) {
        var newLeft = moveEvt.pageX - shiftX - sliderCoords.left;
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

    pin.ondragstart = function () {
      return false;
    };

    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };

  return {
    createEffect: function (controls, image, controlsContainer, pin, line, val) {
      pickEffect(controls, image, controlsContainer);
      setEffect(pin, line, val, image);
    }
  };
})();

