'use strict';

window.picture = (function (backend) {
  var getImages = function (list, template) {

    var renderPicture = function (image) {
      var picturesElement = template.cloneNode(true);
      picturesElement.querySelector('img').src = image.url;
      picturesElement.querySelector('.picture-likes').textContent = image.like;
      picturesElement.querySelector('.picture-comments').textContent = image.comment;
      return picturesElement;
    };

    var successHandler = function (image) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < image.length; i++) {
        fragment.appendChild(renderPicture(image[i]));
      }
      list.appendChild(fragment);
    };

    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    backend.load(successHandler, errorHandler);
  };
  return {
    image: getImages
  };
})(window.backend);


  // var recommended = document.querySelector('#filter-recommend');
    // var popular = document.querySelector('#filter-popular');
    // var discussed = document.querySelector('#filter-discussed');
    // var random = document.querySelector('#filter-random');
    // var filters = document.querySelector('.filters');
    // var pictures = [];
    // var comparator = function (first, second) {
    //   if (first > second) {
    //     return 1;
    //   } else if (first < second) {
    //     return -1;
    //   } else {
    //     return 0;
    //   }
    // };
    // var compareRandom = function (first, second) {
    //   return Math.random() - 0.5;
    // };
    // var updatePictures = function () {
    //   load(pictures.slice().sort(comparator));
    // };
    // recommended.addEventListener('click', function () {
    //   load(pictures.sort(function (first, second) {
    //     return first - second;
    //   }));
    // });
    // popular.addEventListener('click', function () {
    //   load(pictures.sort(function (first, second) {
    //     if (first.likes > second.likes) {
    //       return -1;
    //     } else if (first.likes < second.likes) {
    //       return 1;
    //     } else {
    //       return 0;
    //     }
    //   }));
    // });
    // discussed.addEventListener('click', function () {
    //   load(pictures.sort(function (first, second) {
    //     first = first.comments.length;
    //     second = second.comments.length;
    //     if (first > second) {
    //       return -1;
    //     } else if (first < second) {
    //       return 1;
    //     } else {
    //       return 0;
    //     }
    //   }));
    // });
    // random.addEventListener('click', function () {
    //   // load(pictures.sort(compareRandom));
    //   load(pictures.sort(function (first, second) {
    //     return Math.random() - 0.5;
    //   }));
    // });
    // var successHandler = function (image) {
    //   pictures = image;
    //   // updatePictures();
    // };


// window.picture = (function (backend) {
//   var getImages = function (list, action) {
//     var pictures = [];

//     // var comparator = function (first, second) {
//     //   if (first > second) {
//     //     return 1;
//     //   } else if (first < second) {
//     //     return -1;
//     //   } else {
//     //     return 0;
//     //   }
//     // };

//     // var compareRandom = function (first, second) {
//     //   return Math.random() - 0.5;
//     // };

//     // var updatePictures = function () {
//     //   load(pictures.sort(comparator));
//     // };

//     var recommended = document.querySelector('label[for=filter-recommend]');
//     recommended.addEventListener('click', function () {
//       // updatePictures(first.url, second.url);
//       load(pictures.sort(function (first, second) {
//         return first - second;
//       }));
//     });

//     var popular = document.querySelector('label[for=filter-popular]');
//     popular.addEventListener('click', function () {
//       // updatePictures(first.likes, second.likes);
//       load(pictures.sort(function (first, second) {
//         if (first.likes > second.likes) {
//           return -1;
//         } else if (first.likes < second.likes) {
//           return 1;
//         } else {
//           return 0;
//         }
//       }));
//     });

//     var discussed = document.querySelector('label[for=filter-discussed]');
//     discussed.addEventListener('click', function () {
//       // updatePictures(first.comments, second.comments);
//       load(pictures.sort(function (first, second) {
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

//     var random = document.querySelector('label[for=filter-random]');
//     random.addEventListener('click', function () {
//       // load(pictures.sort(compareRandom));
//       load(pictures.sort(function (first, second) {
//         return Math.random() - 0.5;
//       }));
//     });

//     var successHandler = function (image) {
//       pictures = image;
//       updatePictures();
//     };

//     var load = function (image) {
//       var fragment = document.createDocumentFragment();
//       for (var i = 0; i < image.length; i++) {
//         fragment.appendChild(action(image[i]));
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
//     image: function (list, action) {
//       getImages(list, action);
//     }
//   };
// })(window.backend);


// window.picture = (function (backend) {
//   var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
//   document.querySelector('.upload-overlay').classList.add('hidden');
//   var picturesList = document.querySelector('.pictures');

//   var renderPictures = function (picture) {
//     var picturesElement = pictureTemplate.cloneNode(true);
//     picturesElement.querySelector('img').src = picture.url;
//     picturesElement.querySelector('.picture-likes').textContent = picture.like;
//     picturesElement.querySelector('.picture-comments').textContent = picture.comment;
//     return picturesElement;
//   };

//   var successHandler = function (picture) {
//     var fragment = document.createDocumentFragment();

//     for (var i = 0; i < picture.length; i++) {
//       fragment.appendChild(renderPictures(picture[i]));
//     }
//     picturesList.appendChild(fragment);
//   };

//   var errorHandler = function (errorMessage) {
//     var node = document.createElement('div');
//     node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
//     node.style.position = 'absolute';
//     node.style.left = 0;
//     node.style.right = 0;
//     node.style.fontSize = '30px';

//     node.textContent = errorMessage;
//     document.body.insertAdjacentElement('afterbegin', node);
//   };

//   backend.load(successHandler, errorHandler);
// })(window.backend);

  // var urls = window.data.getUrls(1, 25);
  // var likes = window.data.getLikes(15, 200);
  // var comments = window.data.getComments();
  // var pictures = window.data.createPictures(urls, likes, comments);
