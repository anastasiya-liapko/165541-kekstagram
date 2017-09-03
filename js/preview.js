'use strict';

(function () {
  var urls = window.data.getUrls(1, 25);
  var likes = window.data.getLikes(15, 200);
  var comments = window.data.getComments();
  var pictures = window.data.createPictures(urls, likes, comments);

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var openPicture = document.querySelector('.pictures');

  var renderGallery = function (picture) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
    galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
    galleryOverlay.querySelector('.comments-count').textContent = picture.comment;
    return galleryOverlay;
  };

  openPicture.addEventListener('click', function (evt) {
    evt.preventDefault();
    var elem = event.target;
    if (elem.hasAttribute('src')) {
      var url = elem.getAttribute('src');
      var index = urls.indexOf(url);
      renderGallery(pictures[index]);
    }
  });
})();
