'use strict';

(function (preview, picture, data) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var setupClose = document.querySelector('.gallery-overlay-close');
  var openPicture = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  document.querySelector('.upload-overlay').classList.add('hidden');
  var picturesList = document.querySelector('.pictures');

  var onPopupEscPress = function (evt) {
    data.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  openPicture.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.onkeydown = function (evt) {
    data.isEnterEvent(evt, closePopup);
  };

  var renderGallery = function (image) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = image.url;
    galleryOverlay.querySelector('.likes-count').textContent = image.likes;
    galleryOverlay.querySelector('.comments-count').textContent = image.comments.length;
    return galleryOverlay;
  };
  preview.bigImage(openPicture, renderGallery);

  var renderPictures = function (image) {
    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('img').src = image.url;
    picturesElement.querySelector('.picture-likes').textContent = image.like;
    picturesElement.querySelector('.picture-comments').textContent = image.comment;
    return picturesElement;
  };
  picture.image(picturesList, renderPictures);
})(window.preview, window.picture, window.data);

  // drugPopup.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();

  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };

  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     drugPopup.style.top = (drugPopup.offsetTop - shift.y) + 'px';
  //     drugPopup.style.left = (drugPopup.offsetLeft - shift.x) + 'px';
  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseUp', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // });

  // uploadControl.addEventListener('dragover', function (evt) {
  //   evt.preventDefault();
  //   return false;
  // });

  // uploadControl.addEventListener('drop', function (evt) {
  //   evt.target.style.backgroundColor = '';
  //   // uploadFormPreview.replaceChild(draggedItem, drugPopup);
  //   uploadOverlay.classList.remove('hidden');
  //   evt.preventDefault();
  // });

  // uploadControl.addEventListener('dragenter', function (evt) {
  //   evt.target.style.backgroundColor = 'white';
  //   evt.preventDefault();
  // });

  // uploadControl.addEventListener('dragleave', function (evt) {
  //   evt.target.style.backgroundColor = '';
  //   evt.preventDefault();
  // });


