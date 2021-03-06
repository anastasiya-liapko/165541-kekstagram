'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var HASHTAG_LENGTH = 20;
  var NUMBER_OF_HASHTAGS = 5;
  var NUMBER_OF_PERCENTS = 100;

  var form = document.querySelector('.upload-form');
  var uploadFile = form.querySelector('#upload-file');
  var uploadImage = form.querySelector('.upload-image');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var uploadFormCancel = form.querySelector('.upload-form-cancel');

  var uploadEffect = uploadOverlay.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  var effectControls = uploadEffect.querySelector('.upload-effect-level');
  var thumbElem = effectControls.querySelector('.upload-effect-level-pin');
  var sliderLine = effectControls.querySelector('.upload-effect-level-val');
  var sliderElem = effectControls.querySelector('.upload-effect-level-line');

  var uploadResizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var resizeControlInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var uploadFormHashtags = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');

  var onClick = function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', onKeydown);
  };
  var onKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (uploadFormDescription !== document.activeElement) {
        onClick();
      }
    }
  };

  uploadFile.addEventListener('change', function () {
    if (uploadFile.validity.valid === true) {
      uploadImage.classList.add('hidden');
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onKeydown);
    }
  });

  uploadFormCancel.addEventListener('click', function () {
    onClick();
  });

  effectControls.classList.add('hidden');
  var changeEffect = function (oldEffects, newEffect) {
    oldEffects.forEach(function (item, i) {
      effectImagePreview.classList.remove('effect-' + item);
    });
    effectImagePreview.style.filter = '';
    effectImagePreview.classList.add('effect-' + newEffect);
    effectControls.classList.remove('hidden');
  };
  var parameters = [uploadEffect, effectImagePreview, effectControls, thumbElem, sliderElem, sliderLine, changeEffect];
  window.initializeFilters.createEffect(parameters);

  var adjustScale = function (value) {
    effectImagePreview.style.transform = 'scale(' + value / NUMBER_OF_PERCENTS + ')';
  };
  window.initializeScale.setSize(uploadResizeControlsValue, adjustScale, resizeControlDec, resizeControlInc);

  // uploadFormDescription.addEventListener('invalid', function (evt) {
  //   if (uploadFormDescription.validity.valueMissing) {
  //     uploadFormDescription.setCustomValidity('Обязательное поле');
  //     uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
  //   } else if (uploadFormDescription.validity.tooShort) {
  //     uploadFormDescription.setCustomValidity('Слишком короткое значение');
  //     uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
  //   } else {
  //     uploadFormDescription.setCustomValidity('');
  //     uploadFormDescription.setAttribute('style', 'box-shadow: none');
  //   }
  // });

  var value;
  var sharp;
  var space;
  var repeat;
  var maxFive;
  var maxTwenty;
  var checkHashtags = function () {
    var hashtags = uploadFormHashtags.value;
    var hashtagsArr = [];
    hashtagsArr = hashtags.split(' ');
    var pocket;
    hashtagsArr.forEach(function (item, i) {
      pocket = hashtagsArr[i].split('');
      sharp = (pocket.length >= 1 && pocket[0] !== '#') ? true : false;
    });
    hashtagsArr.forEach(function (item, i) {
      var number = 0;
      pocket.forEach(function (elem, j) {
        if (pocket[j] === '#') {
          number = number + 1;
          space = (number > 1) ? true : false;
        }
      });
    });
    hashtagsArr.forEach(function (item, i) {
      for (var j = i + 1; j < hashtagsArr.length; j++) {
        if (item === hashtagsArr[j]) {
          repeat = true;
        }
      }
    });
    maxFive = (hashtagsArr.length > NUMBER_OF_HASHTAGS) ? true : false;
    hashtagsArr.forEach(function (item, i) {
      pocket = hashtagsArr[i].split('');
      maxTwenty = (pocket.length > HASHTAG_LENGTH) ? true : false;
    });
  };
  var setError = function (evt) {
    uploadFormHashtags.setCustomValidity(value);
    uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    evt.preventDefault();
  };
  var setErrorValue = function () {
    if (sharp) {
      value = 'Хэш-тег начинается с символа `#` (решётка)';
    } else if (space) {
      value = 'хэш-теги разделяются пробелами';
    } else if (repeat) {
      value = 'Один и тот же хэш-тег не может быть использован дважды';
    } else if (maxFive) {
      value = 'Нельзя указать больше пяти хэш-тегов';
    } else if (maxTwenty) {
      value = 'Максимальная длина одного хэш-тега 20 символов';
    }
  };

  form.addEventListener('submit', function (evt) {
    checkHashtags();
    if (sharp || space || repeat || maxFive || maxTwenty) {
      setError(evt, setErrorValue());
    } else {
      window.backend.save(new FormData(form), function (response) {
        uploadOverlay.classList.add('hidden');
        uploadImage.classList.remove('hidden');
        form.reset();
      });
      evt.preventDefault();
    }
  });

  // form.addEventListener('submit', function (evt) {
  //   var sharp = true;
  //   var space = true;
  //   var repeat = true;
  //   var maxFive = true;
  //   var maxTwenty = true;
  //   var hashtag = uploadFormHashtags.value;
  //   var hashtagArr = [];
  //   hashtagArr = hashtag.split(' ');
  //   for (var i = 0; i < hashtagArr.length; i++) {
  //     var pocket = hashtagArr[i].split('');
  //     if (pocket.length >= 1 && pocket[0] !== '#') {
  //       sharp = false;
  //     }
  //   }
  //   for (i = 0; i < hashtagArr.length; i++) {
  //     var bag = hashtagArr[i].split('');
  //     var number = 0;
  //     for (var j = 0; j < bag.length; j++) {
  //       if (bag[j] === '#') {
  //         number = number + 1;
  //         if (number > 1) {
  //           space = false;
  //         }
  //       }
  //     }
  //   }
  //   for (i = 0; i < hashtagArr.length - 1; i++) {
  //     for (j = i + 1; j < hashtagArr.length; j++) {
  //       if (hashtagArr[i] === hashtagArr[j]) {
  //         repeat = false;
  //       }
  //     }
  //   }
  //   if (hashtagArr.length > NUMBER_OF_HASHTAGS) {
  //     maxFive = false;
  //   }
  //   for (i = 0; i < hashtagArr.length; i++) {
  //     pocket = hashtagArr[i].split('');
  //     if (pocket.length > HASHTAG_LENGTH) {
  //       maxTwenty = false;
  //     }
  //   }
  //   if (sharp && space && repeat && maxFive && maxTwenty) {
  //     window.backend.save(new FormData(form), function (response) {
  //       uploadOverlay.classList.add('hidden');
  //       uploadImage.classList.remove('hidden');
  //       form.reset();
  //     });
  //     evt.preventDefault();
  //   } else if (!sharp) {
  //     setError(evt, 'Хэш-тег начинается с символа `#` (решётка)');
  //   } else if (!space) {
  //     setError(evt, 'хэш-теги разделяются пробелами');
  //   } else if (!repeat) {
  //     setError(evt, 'Один и тот же хэш-тег не может быть использован дважды');
  //   } else if (!maxFive) {
  //     setError(evt, 'Нельзя указать больше пяти хэш-тегов');
  //   } else if (!maxTwenty) {
  //     setError(evt, 'Максимальная длина одного хэш-тега 20 символов');
  //   }
  // });
})();
