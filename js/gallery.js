'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var setupClose = document.querySelector('.gallery-overlay-close');
  var openPicture = document.querySelector('.pictures');

  var onPopupEscPress = function (evt) {
    window.data.isEscEvent(evt, closePopup);
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

  setupClose.onkeydown = function (evt) {
    window.data.isEnterEvent(evt, closePopup);
  };
})();
