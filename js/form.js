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


  uploadFile.addEventListener('change', function () {
    if (uploadFile.validity.valid) {
      uploadImage.classList.add('hidden');
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          if (uploadFormDescription !== document.activeElement) {
            uploadOverlay.classList.add('hidden');
            uploadImage.classList.remove('hidden');
          }
        }
      });
    } else {
      uploadFile.setCustomValidity('');
    }
  });

  uploadFormCancel.addEventListener('click', function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
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

  uploadResizeControlsButtonDec.addEventListener('click', function () {
    var resizeControlsValue = uploadResizeControlsValue.getAttribute('value');
    if (resizeControlsValue <= 100 & resizeControlsValue > 25) {
      resizeControlsValue = +resizeControlsValue - 25;
      var resizeControlsValueInPercent = resizeControlsValue / 100;
      uploadResizeControlsValue.setAttribute('value', resizeControlsValue);
      effectImagePreview.setAttribute('style', 'transform: scale(' + resizeControlsValueInPercent + ')');
    }
  });

  uploadResizeControlsButtonInc.addEventListener('click', function () {
    var resizeControlsValue = uploadResizeControlsValue.getAttribute('value');
    if (resizeControlsValue < 100 & resizeControlsValue >= 25) {
      resizeControlsValue = +resizeControlsValue + 25;
      var resizeControlsValueInPercent = resizeControlsValue / 100;
      uploadResizeControlsValue.setAttribute('value', resizeControlsValue);
      effectImagePreview.setAttribute('style', 'transform: scale(' + resizeControlsValueInPercent + ')');
    }
  });

  uploadFormDescription.addEventListener('invalid', function (evt) {
    if (uploadFormDescription.validity.valueMissing) {
      uploadFormDescription.setCustomValidity('Обязательное поле');
      uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    } else
    if (uploadFormDescription.validity.tooShort) {
      uploadFormDescription.setCustomValidity('Слишком короткое значение');
      uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    } else {
      uploadFormDescription.setCustomValidity('');
      uploadFormDescription.setAttribute('style', 'box-shadow: none');
    }
  });

  form.addEventListener('submit', function (evt) {
    var a = true;
    var b = true;
    var c = true;
    var d = true;
    var e = true;
    var hashtag = uploadFormHashtags.value;
    var hashtagArr = [];
    hashtagArr = hashtag.split(' ');
    for (var i = 0; i < hashtagArr.length; i++) {
      var pocket = hashtagArr[i].split('');
      if (pocket.length > 1 && pocket[0] !== '#') {
        a = false;
      } else if (i === hashtagArr.length) {
        break;
      }
    }
    for (i = 0; i < hashtagArr.length; i++) {
      var bag = hashtagArr[i].split('');
      var number = 0;
      for (var j = 0; j < bag.length; j++) {
        if (bag[j] === '#') {
          number = number + 1;
          if (number > 1) {
            b = false;
          }
        } else if (i === hashtagArr.length) {
          break;
        }
      }
    }
    for (i = 0; i < hashtagArr.length - 1; i++) {
      for (j = i + 1; j < hashtagArr.length; j++) {
        if (hashtagArr[i] === hashtagArr[j]) {
          c = false;
        } else if (i === hashtagArr.length) {
          break;
        }
      }
    }
    if (hashtagArr.length > 5) {
      d = false;
    }
    if (pocket.length > 20) {
      e = false;
    }
    if (a === true && b === true && c === true && d === true && e === true) {
      window.backend.save(new FormData(form), function (response) {
        uploadOverlay.classList.add('hidden');
        uploadImage.classList.remove('hidden');
        form.reset();
      });
      evt.preventDefault();
    } else if (a === false) {
      uploadFormHashtags.setCustomValidity('Хэш-тег начинается с символа `#` (решётка)');
      uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
      evt.preventDefault();
    } else if (b === false) {
      uploadFormHashtags.setCustomValidity('хэш-теги разделяются пробелами');
      uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
      evt.preventDefault();
    } else if (c === false) {
      uploadFormHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
      evt.preventDefault();
    } else if (d === false) {
      uploadFormHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
      evt.preventDefault();
    } else if (e === false) {
      uploadFormHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
      evt.preventDefault();
    }
  });
})();
