'use strict';

(function () {
  var urls = window.data.getUrls(1, 25);
  var likes = window.data.getLikes(15, 200);
  var comments = window.data.getComments();
  var pictures = window.data.createPictures(urls, likes, comments);

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
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPictures(pictures[i]));
  }
  picturesList.appendChild(fragment);
})();
