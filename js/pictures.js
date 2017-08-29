'use strict';

var commentsArray = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getUrls = function (min, max) {
  var urls = [];
  for (var i = 0; i < max; i++) {
    urls[i] = 'photos/' + (i + 1) + '.jpg';
  }
  return urls;
};

var getLikes = function (min, max) {
  var likes = [];
  for (var i = 0; i < 25; i++) {
    likes[i] = min - 0.5 + Math.random() * (max - min + 1);
    likes[i] = Math.round(likes[i]);
  }
  return likes;
};

var getComments = function () {
  var comments = [];
  for (var i = 0; i < 25; i++) {
    var number = Math.floor(Math.random() * commentsArray.length);
    comments[i] = commentsArray[number];
  }
  return comments;
};

var createPictures = function (urls, likes, comments) {
  var pictures = [];
  for (var i = 0; i < 25; i++) {
    pictures[i] = {};
    pictures[i].url = urls[i];
    pictures[i].likes = likes[i];
    pictures[i].comment = comments[i];
  }
  return pictures;
};

var urls = getUrls(1, 25);
var likes = getLikes(15, 200);
var comments = getComments(commentsArray);
var pictures = createPictures(urls, likes, comments);

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
document.querySelector('.upload-overlay').classList.add('hidden');
var galleryOverlay = document.querySelector('.gallery-overlay');

var renderPictures = function (picture) {
  var picturesElement = pictureTemplate.cloneNode(true);
  picturesElement.querySelector('img').src = picture.url;
  picturesElement.querySelector('.picture-likes').textContent = picture.like;
  picturesElement.querySelector('.picture-comments').textContent = picture.comment;
  return picturesElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPictures(pictures[i]));
}
picturesList.appendChild(fragment);

var renderGallery = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comment;
  return galleryOverlay;
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupClose = document.querySelector('.gallery-overlay-close');
var openPicture = document.querySelector('.pictures');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

openPicture.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

openPicture.onkeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};

setupClose.onkeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

openPicture.addEventListener('click', function (evt) {
  evt.preventDefault();
  var elem = event.target;
  if (elem.hasAttribute('src')) {
    var url = elem.getAttribute('src');
    var index = urls.indexOf(url);
    renderGallery(pictures[index]);
  }
});

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

uploadImage.classList.add('hidden');
uploadOverlay.classList.remove('hidden');

uploadFile.addEventListener('change', function (evt) {
  if (!uploadFile.validity.valid) {
    uploadImage.classList.add('hidden');
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function () {
      if (evt.keyCode === 27) {
        uploadOverlay.classList.add('hidden');
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
  if (elem === document.querySelector('#upload-effect-none')) {
    effectImagePreview.classList.add('.effect-none');
  } else
  if (elem === document.querySelector('#upload-effect-chrome')) {
    effectImagePreview.classList.add('.effect-chrome');
  } else
  if (elem === document.querySelector('#upload-effect-sepia')) {
    effectImagePreview.classList.add('.effect-sepia');
  } else
  if (elem === document.querySelector('#upload-effect-marvin')) {
    effectImagePreview.classList.add('.effect-marvin');
  } else
  if (elem === document.querySelector('#upload-effect-phobos')) {
    effectImagePreview.classList.add('.effect-phobos');
  } else
  if (elem === document.querySelector('#upload-effect-heat')) {
    effectImagePreview.classList.add('.effect-heat');
  }
});

uploadResizeControlsButtonDec.addEventListener('click', function () {
  var resizeControlsValue = uploadResizeControlsValue.getAttribute('value');
  if (resizeControlsValue <= 100 & resizeControlsValue > 25) {
    resizeControlsValue = +resizeControlsValue - 25;
    uploadResizeControlsValue.setAttribute('value', resizeControlsValue);
    effectImagePreview.setAttribute('style', 'transform: scale(resizeControlsValueInPercent)');
  }
});

uploadResizeControlsButtonInc.addEventListener('click', function () {
  var resizeControlsValue = uploadResizeControlsValue.getAttribute('value');
  if (resizeControlsValue < 100 & resizeControlsValue >= 25) {
    resizeControlsValue = +resizeControlsValue + 25;
    uploadResizeControlsValue.setAttribute('value', resizeControlsValue);
    effectImagePreview.setAttribute('style', 'transform: scale(resizeControlsValue / 100)');
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

uploadFormHashtags.addEventListener('invalid', function (evt) {
  if (uploadFormHashtags.validity.PatternMismatch) {
    uploadFormHashtags.setCustomValidity('Не соответствует паттерну');
    uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
  } else
  if (uploadFormHashtags.validity.tooLong) {
    uploadFormHashtags.setCustomValidity('Больше максимальной длины');
    uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
  } else {
    uploadFormDescription.setCustomValidity('');
    uploadFormDescription.setAttribute('style', 'box-shadow: none');
  }
});
