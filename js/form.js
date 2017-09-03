'use strict';

(function () {
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

  uploadEffect.addEventListener('click', function (evt) {
    var elem = event.target;
    effectImagePreview.classList.remove('effect-none');
    effectImagePreview.classList.remove('effect-chrome');
    effectImagePreview.classList.remove('effect-sepia');
    effectImagePreview.classList.remove('effect-marvin');
    effectImagePreview.classList.remove('effect-phobos');
    effectImagePreview.classList.remove('effect-heat');
    if (elem === document.querySelector('#upload-effect-none')) {
      effectImagePreview.classList.add('effect-none');
    } else
    if (elem === document.querySelector('#upload-effect-chrome')) {
      effectImagePreview.classList.add('effect-chrome');
    } else
    if (elem === document.querySelector('#upload-effect-sepia')) {
      effectImagePreview.classList.add('effect-sepia');
    } else
    if (elem === document.querySelector('#upload-effect-marvin')) {
      effectImagePreview.classList.add('effect-marvin');
    } else
    if (elem === document.querySelector('#upload-effect-phobos')) {
      effectImagePreview.classList.add('effect-phobos');
    } else
    if (elem === document.querySelector('#upload-effect-heat')) {
      effectImagePreview.classList.add('effect-heat');
    }
  });

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

  var setError = function (value) {
    uploadFormHashtags.setCustomValidity(value);
    uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
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
      window.backend.save(new FormData(form), function (response) {
        uploadOverlay.classList.add('hidden');
        uploadImage.classList.remove('hidden');
        form.reset();
      });
      evt.preventDefault();
    } else if (!sharp) {
      setError('Хэш-тег начинается с символа `#` (решётка)');
      evt.preventDefault();
    } else if (!space) {
      setError('хэш-теги разделяются пробелами');
      evt.preventDefault();
    } else if (!repeat) {
      setError('Один и тот же хэш-тег не может быть использован дважды');
      evt.preventDefault();
    } else if (!maxFive) {
      setError('Нельзя указать больше пяти хэш-тегов');
      evt.preventDefault();
    } else if (!maxTwenty) {
      setError('Максимальная длина одного хэш-тега 20 символов');
      evt.preventDefault();
    }
  });
})();
