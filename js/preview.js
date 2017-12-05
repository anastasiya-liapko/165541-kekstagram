'use strict';

(function () {
  var renderGallery = function (image, element) {
    element.querySelector('.gallery-overlay-image').src = image.url;
    element.querySelector('.likes-count').textContent = image.likes;
    element.querySelector('.comments-count').textContent = image.comments.length;
    return element;
  };
  window.preview = function (pictures, url, element) {
    for (var i = 0; i < pictures.length; i++) {
      var pictureUrl = pictures[i].url;
      if (pictureUrl === url) {
        var index = i;
      }
    }
    renderGallery(pictures[index], element);
  };
})();

// (function () {
//   var openImage = function (image, action) {
//     image.addEventListener('click', function (evt) {
//       evt.preventDefault();
//       var elem = evt.target;
//       var url;
//       if (elem.hasAttribute('src')) {
//         url = elem.getAttribute('src');
//       }

//       var onSuccess = function (pictures) {
//         for (var i = 0; i < pictures.length; i++) {
//           var pictureUrl = pictures[i].url;
//           if (pictureUrl === url) {
//             var index = i;
//           }
//         }
//         action(pictures[index]);
//       };

//       var onError = function (errorMessage) {
//         window.util.error(errorMessage);
//       };

//       window.backend.load(onSuccess, onError);
//     });
//   };

//   window.preview = {
//     bigImage: openImage
//   };
// })();
