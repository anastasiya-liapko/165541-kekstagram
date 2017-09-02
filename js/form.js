'use strict';

(function () {
  var uploadSelectImage = document.querySelector('.upload-form');
  var uploadFile = uploadSelectImage.querySelector('#upload-file');
  var uploadImage = document.querySelector('.upload-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadSelectImage.querySelector('.upload-form-cancel');
  var uploadEffect = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadResizeControlsValue = uploadSelectImage.querySelector('.upload-resize-controls-value');
  var uploadResizeControlsButtonDec = uploadSelectImage.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsButtonInc = uploadSelectImage.querySelector('.upload-resize-controls-button-inc');
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

  uploadSelectImage.addEventListener('submit', function (event) {
    var hashtag = uploadFormHashtags.value;
    var hashtagArr = [];
    hashtagArr = hashtag.split(' ');
    for (var i = 0; i < hashtagArr.length; i++) {
      var pocket = hashtagArr[i].split('');
      if (pocket[0] !== '#') {
        uploadFormHashtags.setCustomValidity('Хэш-тег начинается с символа `#` (решётка)');
        uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
        event.preventDefault();
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
            uploadFormHashtags.setCustomValidity('Хэш-тег начинается с символа `#` (решётка)');
            uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
            event.preventDefault();
          }
        } else if (i === hashtagArr.length) {
          break;
        }
      }
    }
    for (i = 0; i < hashtagArr.length - 1; i++) {
      for (j = i + 1; j < hashtagArr.length; j++) {
        if (hashtagArr[i] === hashtagArr[j]) {
          uploadFormHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
          event.preventDefault();
        } else if (i === hashtagArr.length) {
          break;
        }
      }
    }
    if (hashtagArr.length > 5) {
      uploadFormHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
      event.preventDefault();
    }
    if (hashtagArr[i].split('') > 20) {
      uploadFormHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
      event.preventDefault();
    }
    uploadFormHashtags.setCustomValidity('');
    uploadFormHashtags.setAttribute('style', 'box-shadow: none');
    // return true;
  });

})();

// uploadFormHashtags.addEventListener('invalid', function (evt) {
//   if (uploadFormHashtags.validity.PatternMismatch) {
//     uploadFormHashtags.setCustomValidity('Не соответствует паттерну');
//     uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
//   } else
//   if (uploadFormHashtags.validity.tooLong) {
//     uploadFormHashtags.setCustomValidity('Больше максимальной длины');
//     uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
//   } else {
//     uploadFormDescription.setCustomValidity('');
//     uploadFormDescription.setAttribute('style', 'box-shadow: none');
//   }
// });

// var validateForm = function () {
//   var hashtag = uploadFormHashtags.value;
//   var hashtagArr = hashtag.split(', ');
//   var hashtagLength = hashtagArr.length;
//   for (var i = 0; i < hashtag.length; i++) {
//     if (hashtagArr[i] === hashtagArr[i + 1]) {
//       alert('Один и тот же хэш-тег не может быть использован дважды');
//       return false;
//     };
//   if (hashtagArr > hashtagLength) {
//     alert('Нельзя указать больше пяти хэш-тегов');
//     return false;
//   }
//   if (hashtagArr[i].split('') > 20) {
//     alert('Максимальная длина одного хэш-тега 20 символов');
//     return false;
//   }
// };

// uploadSelectImage.addEventListener('submit', function () {
//   validateForm();
// });
