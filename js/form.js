'use strict';

(function (backend) {
  var form = document.querySelector('.upload-form');
  var uploadFile = form.querySelector('#upload-file');
  var uploadImage = document.querySelector('.upload-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = form.querySelector('.upload-form-cancel');
  var uploadEffect = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadResizeControlsValue = form.querySelector('.upload-resize-controls-value');
  var uploadResizeControlsButtonDec = form.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsButtonInc = form.querySelector('.upload-resize-controls-button-inc');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var resizeControlsValue = uploadResizeControlsValue.getAttribute('value');
  var thumbElem = document.querySelector('.upload-effect-level-pin');
  var sliderLine = document.querySelector('.upload-effect-level-val');
  var sliderElem = document.querySelector('.upload-effect-level-line');
  var effectControls = document.querySelector('.upload-effect-level');

  var clickHundler = function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', keydownHundler);
  };

  var keydownHundler = function (evt) {
    if (evt.keyCode === 27) {
      if (uploadFormDescription !== document.activeElement) {
        clickHundler();
      }
    }
  };

  uploadFile.addEventListener('change', function () {
    if (uploadFile.validity.valid === true) {
      uploadImage.classList.add('hidden');
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', keydownHundler);
    }
  });

  uploadFormCancel.addEventListener('click', function () {
    clickHundler();
  });

  effectControls.classList.add('hidden');

  uploadEffect.addEventListener('click', function (evt) {
    var elem = evt.target;
    if (elem !== effectControls && elem !== sliderElem && elem !== sliderLine && elem !== thumbElem) {
      effectImagePreview.classList.remove('effect-none');
      effectImagePreview.classList.remove('effect-chrome');
      effectImagePreview.classList.remove('effect-sepia');
      effectImagePreview.classList.remove('effect-marvin');
      effectImagePreview.classList.remove('effect-phobos');
      effectImagePreview.classList.remove('effect-heat');
      effectImagePreview.style.filter = '';
    }

    if (elem === document.querySelector('#upload-effect-none')) {
      effectImagePreview.classList.add('effect-none');
      effectControls.classList.add('hidden');
    } else
    if (elem === document.querySelector('#upload-effect-chrome')) {
      effectImagePreview.classList.add('effect-chrome');
      effectControls.classList.remove('hidden');
    } else
    if (elem === document.querySelector('#upload-effect-sepia')) {
      effectImagePreview.classList.add('effect-sepia');
      effectControls.classList.remove('hidden');
    } else
    if (elem === document.querySelector('#upload-effect-marvin')) {
      effectImagePreview.classList.add('effect-marvin');
      effectControls.classList.remove('hidden');
    } else
    if (elem === document.querySelector('#upload-effect-phobos')) {
      effectImagePreview.classList.add('effect-phobos');
      effectControls.classList.remove('hidden');
    } else
    if (elem === document.querySelector('#upload-effect-heat')) {
      effectImagePreview.classList.add('effect-heat');
      effectControls.classList.remove('hidden');
    }
  });

  thumbElem.onmousedown = function (evt) {
    var thumbCoords = getCoords(thumbElem);
    var shiftX = evt.pageX - thumbCoords.left;

    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function (moveEvt) {
      var newLeft = moveEvt.pageX - shiftX - sliderCoords.left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = sliderElem.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumbElem.style.left = newLeft + 'px';
      sliderLine.style.width = newLeft + 'px';

      var sliderCoordsLeft = sliderCoords.left;

      var effectValue = (newLeft + sliderCoordsLeft) / rightEdge;
      if (effectImagePreview.classList.contains('effect-chrome')) {
        var effectValueChrome = effectValue * 1;
        effectImagePreview.setAttribute('style', 'filter: grayscale(' + effectValueChrome + ')');
      } else if (effectImagePreview.classList.contains('effect-sepia')) {
        var effectValueSepia = effectValue * 1;
        effectImagePreview.setAttribute('style', 'filter: sepia(' + effectValueSepia + ')');
      } else if (effectImagePreview.classList.contains('effect-marvin')) {
        var effectValueMarvin = effectValue * 100;
        effectImagePreview.setAttribute('style', 'filter: invert(' + effectValueMarvin + '%)');
      } else if (effectImagePreview.classList.contains('effect-phobos')) {
        var effectValuePhobos = effectValue * 3;
        effectImagePreview.setAttribute('style', 'filter: blur(' + effectValuePhobos + 'px)');
      } else if (effectImagePreview.classList.contains('effect-heat')) {
        var effectValueHeat = effectValue * 3;
        effectImagePreview.setAttribute('style', 'filter: brightness(' + effectValueHeat + ')');
      }
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  thumbElem.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  var setResizeValue = function () {
    var resizeControlsValueInPercent = resizeControlsValue / 100;
    uploadResizeControlsValue.setAttribute('value', resizeControlsValue);
    effectImagePreview.setAttribute('style', 'transform: scale(' + resizeControlsValueInPercent + ')');
  };

  uploadResizeControlsButtonDec.addEventListener('click', function () {
    if (resizeControlsValue <= 100 && resizeControlsValue > 25) {
      resizeControlsValue = +resizeControlsValue - 25;
      setResizeValue();
    }
  });

  uploadResizeControlsButtonInc.addEventListener('click', function () {
    if (resizeControlsValue < 100 && resizeControlsValue >= 25) {
      resizeControlsValue = +resizeControlsValue + 25;
      setResizeValue();
    }
  });

  uploadFormDescription.addEventListener('invalid', function (evt) {
    if (uploadFormDescription.validity.valueMissing) {
      uploadFormDescription.setCustomValidity('Обязательное поле');
      uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    } else if (uploadFormDescription.validity.tooShort) {
      uploadFormDescription.setCustomValidity('Слишком короткое значение');
      uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    } else {
      uploadFormDescription.setCustomValidity('');
      uploadFormDescription.setAttribute('style', 'box-shadow: none');
    }
  });

  var setError = function (evt, value) {
    uploadFormHashtags.setCustomValidity(value);
    uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    evt.preventDefault();
  };

  form.addEventListener('submit', function (evt) {
    var sharp = true;
    var space = true;
    var repeat = true;
    var maxFive = true;
    var maxTwenty = true;
    var hashtag = uploadFormHashtags.value;
    var hashtagArr = [];
    hashtagArr = hashtag.split(' ');
    for (var i = 0; i < hashtagArr.length; i++) {
      var pocket = hashtagArr[i].split('');
      if (pocket.length >= 1 && pocket[0] !== '#') {
        sharp = false;
      }
    }
    for (i = 0; i < hashtagArr.length; i++) {
      var bag = hashtagArr[i].split('');
      var number = 0;
      for (var j = 0; j < bag.length; j++) {
        if (bag[j] === '#') {
          number = number + 1;
          if (number > 1) {
            space = false;
          }
        }
      }
    }
    for (i = 0; i < hashtagArr.length - 1; i++) {
      for (j = i + 1; j < hashtagArr.length; j++) {
        if (hashtagArr[i] === hashtagArr[j]) {
          repeat = false;
        }
      }
    }
    if (hashtagArr.length > 5) {
      maxFive = false;
    }
    for (i = 0; i < hashtagArr.length; i++) {
      pocket = hashtagArr[i].split('');
      if (pocket.length > 20) {
        maxTwenty = false;
      }
    }
    if (sharp && space && repeat && maxFive && maxTwenty) {
      backend.save(new FormData(form), function (response) {
        uploadOverlay.classList.add('hidden');
        uploadImage.classList.remove('hidden');
        form.reset();
      });
      evt.preventDefault();
    } else if (!sharp) {
      setError(evt, 'Хэш-тег начинается с символа `#` (решётка)');
    } else if (!space) {
      setError(evt, 'хэш-теги разделяются пробелами');
    } else if (!repeat) {
      setError(evt, 'Один и тот же хэш-тег не может быть использован дважды');
    } else if (!maxFive) {
      setError(evt, 'Нельзя указать больше пяти хэш-тегов');
    } else if (!maxTwenty) {
      setError(evt, 'Максимальная длина одного хэш-тега 20 символов');
    }
  });
})(window.backend);
