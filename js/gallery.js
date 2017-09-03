'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var setupClose = document.querySelector('.gallery-overlay-close');
  var openPicture = document.querySelector('.pictures');
  var drugPopup = document.querySelector('.effect-image-preview');
  var uploadEffect = document.querySelector('.upload-effect');
  var uploadControl = document.querySelector('.upload-control');
  var uploadOverlay = document.querySelector('.upload-overlay');
  // var uploadFormPreview = document.querySelector('.upload-form-preview');

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

  drugPopup.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      uploadEffect.style.top = (uploadEffect.offsetTop - shift.y) + 'px';
      uploadEffect.style.left = (uploadEffect.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseUp', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  uploadControl.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  uploadControl.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    // uploadFormPreview.replaceChild(draggedItem, drugPopup);
    uploadOverlay.classList.remove('hidden');
    evt.preventDefault();
  });

  uploadControl.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'white';
    evt.preventDefault();
  });

  uploadControl.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();

