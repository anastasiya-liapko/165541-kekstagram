'use strict';

window.preview = (function (backend) {
  var openImage = function (renderGallery) {
    var elem = event.target;
    var url;
    var index;
    var i;
    if (elem.hasAttribute('src')) {
      url = elem.getAttribute('src');
    }
    backend.load(function (picture) {
      for (i = 0; i < picture.length; i++) {
        if (picture[i].url === url) {
          index = i;
        }
      }
      renderGallery(picture[index]);
    });
  };

  return {
    gallery: function (renderGallery) {
      openImage(renderGallery);
    }
  };
})(window.backend);


// window.preview = (function (backend) {
//   var galleryOverlay = document.querySelector('.gallery-overlay');
//   var openPicture = document.querySelector('.pictures');

//   var renderGallery = function (picture) {
//     galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
//     galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
//     galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
//     return galleryOverlay;
//   };

//   openPicture.addEventListener('click', function (evt) {
//     evt.preventDefault();
//     var elem = event.target;
//     var url;
//     var index;
//     var i;
//     if (elem.hasAttribute('src')) {
//       url = elem.getAttribute('src');
//     }
//     backend.load(function (picture) {
//       for (i = 0; i < picture.length; i++) {
//         if (picture[i].url === url) {
//           index = i;
//         }
//       }
//       renderGallery(picture[index]);
//     });
//   });
// })(window.backend);

  // var urls = window.data.getUrls(1, 25);
  // var likes = window.data.getLikes(15, 200);
  // var comments = window.data.getComments();
  // var pictures = window.data.createPictures(urls, likes, comments);

  // openPicture.addEventListener('click', function (evt) {
  //   evt.preventDefault();
  //   var elem = event.target;
  //   if (elem.hasAttribute('src')) {
  //     var url = elem.getAttribute('src');
  //     var index = urls.indexOf(url);
  //     renderGallery(pictures[index]);
  //   }
  // });
