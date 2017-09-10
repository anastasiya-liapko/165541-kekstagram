'use strict';

window.picture = (function () {
  return {
    renderPicture: function (image) {
      var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
      var picturesElement = pictureTemplate.cloneNode(true);
      picturesElement.querySelector('img').src = image.url;
      picturesElement.querySelector('.picture-likes').textContent = image.like;
      picturesElement.querySelector('.picture-comments').textContent = image.comment;
      return picturesElement;
    }
  };
})();

// window.picture = (function (backend) {
//   var getImages = function (list) {
//     var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
//     var recommended = document.querySelector('#filter-recommend');
//     var popular = document.querySelector('#filter-popular');
//     var discussed = document.querySelector('#filter-discussed');
//     var random = document.querySelector('#filter-random');

//     var pictures = [];

//     var comparator = function (first, second) {
//       if (first > second) {
//         return -1;
//       } else if (first < second) {
//         return 1;
//       } else {
//         return 0;
//       }
//     };
//     var compareNumbers = function (first, second) {
//       return first - second;
//     };
//     var compareRandom = function (first, second) {
//       return Math.random() - 0.5;
//     };
//     var updatePictures = function (param) {
//       load(pictures.slice().sort(param));
//     };
//     var successHandler = function (image) {
//       pictures = image;
//       // updatePictures();
//     };

//     recommended.addEventListener('click', function () {
//       load(pictures.slice().sort(function (first, second) {
//         return pictures.indexOf(first) - pictures.indexOf(second);
//       }));
//     });
//     popular.addEventListener('click', function () {
//       load(pictures.slice().sort(function (first, second) {
//         if (first.likes > second.likes) {
//           return -1;
//         } else if (first.likes < second.likes) {
//           return 1;
//         } else {
//           return 0;
//         }
//       }));
//     });
//     discussed.addEventListener('click', function () {
//       load(pictures.slice().sort(function (first, second) {
//         first = first.comments.length;
//         second = second.comments.length;
//         if (first > second) {
//           return -1;
//         } else if (first < second) {
//           return 1;
//         } else {
//           return 0;
//         }
//       }));
//     });
//     random.addEventListener('click', function () {
//       updatePictures(compareRandom);
//       // load(pictures.slice().sort(function (first, second) {
//       //   return Math.random() - 0.5;
//       // }));
//     });
//     random.removeEventListener('click', updatePictures);
//     var renderPicture = function (image) {
//       var picturesElement = pictureTemplate.cloneNode(true);
//       picturesElement.querySelector('img').src = image.url;
//       picturesElement.querySelector('.picture-likes').textContent = image.like;
//       picturesElement.querySelector('.picture-comments').textContent = image.comment;
//       return picturesElement;
//     };

//     var load = function (image) {
//       var fragment = document.createDocumentFragment();
//       for (var i = 0; i < image.length; i++) {
//         fragment.appendChild(renderPicture(image[i]));
//       }
//       list.appendChild(fragment);
//     };

//     var errorHandler = function (errorMessage) {
//       var node = document.createElement('div');
//       node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
//       node.style.position = 'absolute';
//       node.style.left = 0;
//       node.style.right = 0;
//       node.style.fontSize = '30px';

//       node.textContent = errorMessage;
//       document.body.insertAdjacentElement('afterbegin', node);
//     };

//     backend.load(successHandler, errorHandler);
//   };
//   return {
//     image: getImages
//   };
// })(window.backend);


  // var urls = window.data.getUrls(1, 25);
  // var likes = window.data.getLikes(15, 200);
  // var comments = window.data.getComments();
  // var pictures = window.data.createPictures(urls, likes, comments);
