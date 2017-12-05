'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var setupClose = galleryOverlay.querySelector('.gallery-overlay-close');
  // var openPicture = document.querySelector('.pictures');
  var picturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var recommended = filters.querySelector('#filter-recommend');
  var popular = filters.querySelector('#filter-popular');
  var discussed = filters.querySelector('#filter-discussed');
  var random = filters.querySelector('#filter-random');

  document.querySelector('.upload-overlay').classList.add('hidden');
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };
  var openPopup = function () {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  picturesList.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });
  setupClose.addEventListener('click', function () {
    closePopup();
  });
  setupClose.onkeydown = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var pictures = [];

  picturesList.addEventListener('click', function (evt) {
    evt.preventDefault();
    var elem = evt.target;
    if (elem.hasAttribute('src')) {
      var url = elem.getAttribute('src');
    }
    window.preview(pictures, url, galleryOverlay);
  });

  recommended.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      var firstArray;
      var firstNumber;
      var secondArray;
      var secondNumber;
      first = first.url;
      second = second.url;
      var slash = '/';
      var dot = '.';
      firstArray = first.split(slash);
      firstNumber = firstArray[1].split(dot);
      secondArray = second.split(slash);
      secondNumber = secondArray[1].split(dot);
      return firstNumber[0] - secondNumber[0];
    });
    window.util.debounce(renderPictures);
  });
  popular.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      if (first.likes > second.likes) {
        return -1;
      } else if (first.likes < second.likes) {
        return 1;
      } else {
        return 0;
      }
    });
    window.util.debounce(renderPictures);
  });
  discussed.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      first = first.comments.length;
      second = second.comments.length;
      if (first > second) {
        return -1;
      } else if (first < second) {
        return 1;
      } else {
        return 0;
      }
    });
    window.util.debounce(renderPictures);
  });
  random.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      return Math.random() - 0.5;
    });
    window.util.debounce(renderPictures);
  });

  var renderPictures = function () {
    render(pictures);
  };
  var render = function (image) {
    picturesList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < image.length; i++) {
      fragment.appendChild(window.picture(image[i]));
    }
    picturesList.appendChild(fragment);
  };

  var onSuccess = function (image) {
    pictures = image;
    renderPictures();
    filters.classList.remove('hidden');
  };
  var onError = function (errorMessage) {
    window.util.error(errorMessage);
  };

  window.backend.load(onSuccess, onError);
})();

// (function () {
//   var galleryOverlay = document.querySelector('.gallery-overlay');
//   var setupClose = galleryOverlay.querySelector('.gallery-overlay-close');
//   // var openPicture = document.querySelector('.pictures');
//   var picturesList = document.querySelector('.pictures');
//   var filters = document.querySelector('.filters');
//   var recommended = filters.querySelector('#filter-recommend');
//   var popular = filters.querySelector('#filter-popular');
//   var discussed = filters.querySelector('#filter-discussed');
//   var random = filters.querySelector('#filter-random');

//   document.querySelector('.upload-overlay').classList.add('hidden');
//   var onPopupEscPress = function (evt) {
//     window.util.isEscEvent(evt, closePopup);
//   };
//   var openPopup = function () {
//     galleryOverlay.classList.remove('hidden');
//     document.addEventListener('keydown', onPopupEscPress);
//   };
//   var closePopup = function () {
//     galleryOverlay.classList.add('hidden');
//     document.removeEventListener('keydown', onPopupEscPress);
//   };
//   picturesList.addEventListener('click', function (evt) {
//     evt.preventDefault();
//     openPopup();
//   });
//   setupClose.addEventListener('click', function () {
//     closePopup();
//   });
//   setupClose.onkeydown = function (evt) {
//     window.util.isEnterEvent(evt, closePopup);
//   };

//   var renderGallery = function (image) {
//     galleryOverlay.querySelector('.gallery-overlay-image').src = image.url;
//     galleryOverlay.querySelector('.likes-count').textContent = image.likes;
//     galleryOverlay.querySelector('.comments-count').textContent = image.comments.length;
//     return galleryOverlay;
//   };
//   window.preview.bigImage(picturesList, renderGallery);

//   recommended.addEventListener('click', function () {
//     pictures.sort(function (first, second) {
//       var firstArray;
//       var firstNumber;
//       var secondArray;
//       var secondNumber;
//       first = first.url;
//       second = second.url;
//       var slash = '/';
//       var dot = '.';
//       firstArray = first.split(slash);
//       firstNumber = firstArray[1].split(dot);
//       secondArray = second.split(slash);
//       secondNumber = secondArray[1].split(dot);
//       return firstNumber[0] - secondNumber[0];
//     });
//     window.util.debounce(renderPictures);
//   });
//   popular.addEventListener('click', function () {
//     pictures.sort(function (first, second) {
//       if (first.likes > second.likes) {
//         return -1;
//       } else if (first.likes < second.likes) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//     window.util.debounce(renderPictures);
//   });
//   discussed.addEventListener('click', function () {
//     pictures.sort(function (first, second) {
//       first = first.comments.length;
//       second = second.comments.length;
//       if (first > second) {
//         return -1;
//       } else if (first < second) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//     window.util.debounce(renderPictures);
//   });
//   random.addEventListener('click', function () {
//     pictures.sort(function (first, second) {
//       return Math.random() - 0.5;
//     });
//     window.util.debounce(renderPictures);
//   });

//   var pictures = [];
//   var renderPictures = function () {
//     render(pictures);
//   };
//   var render = function (image) {
//     picturesList.innerHTML = '';
//     var fragment = document.createDocumentFragment();
//     for (var i = 0; i < image.length; i++) {
//       fragment.appendChild(window.picture(image[i]));
//     }
//     picturesList.appendChild(fragment);
//   };

//   var successHandler = function (image) {
//     pictures = image;
//     renderPictures();
//     filters.classList.remove('hidden');
//   };
//   var errorHandler = function (errorMessage) {
//     window.util.error(errorMessage);
//   };

//   window.backend.load(successHandler, errorHandler);
// })();



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
