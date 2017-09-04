'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  document.querySelector('.upload-overlay').classList.add('hidden');
  var picturesList = document.querySelector('.pictures');

  var renderPictures = function (picture) {
    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('img').src = picture.url;
    picturesElement.querySelector('.picture-likes').textContent = picture.like;
    picturesElement.querySelector('.picture-comments').textContent = picture.comment;
    return picturesElement;
  };

  var successHandler = function (picture) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picture.length; i++) {
      fragment.appendChild(renderPictures(picture[i]));
    }
    picturesList.appendChild(fragment);
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

  window.backend.load(successHandler, errorHandler);
})();

  // var urls = window.data.getUrls(1, 25);
  // var likes = window.data.getLikes(15, 200);
  // var comments = window.data.getComments();
  // var pictures = window.data.createPictures(urls, likes, comments);
