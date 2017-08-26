'use strict';

var commentsArray = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getUrls = function (min, max) {
  var urls = {};
  for (var i = 0; i < max; i++) {
    urls[i] = 'photos/' + (i + 1) + '.jpg';
  }
  return urls;
};

var getLikes = function (min, max) {
  var likes = {};
  for (var i = 0; i < 25; i++) {
    likes[i] = min - 0.5 + Math.random() * (max - min + 1);
    likes[i] = Math.round(likes[i]);
  }
  return likes;
};

var getComments = function () {
  var comments = {};
  for (var i = 0; i < 25; i++) {
    var number = Math.floor(Math.random() * commentsArray.length);
    comments[i] = commentsArray[number];
  }
  return comments;
};

var createPictures = function (urls, likes, comments) {
  var pictures = [];
  for (var i = 0; i < 25; i++) {
    pictures[i] = {
      url: urls[i],
      likes: likes[i],
      comment: comments[i]
    };
  }
  return pictures;
};

var urls = getUrls(1, 25);
var likes = getLikes(15, 200);
var comments = getComments(commentsArray);
var pictures = createPictures(urls, likes, comments);

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
document.querySelector('.upload-overlay').classList.add('hidden');
var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');

var renderPictures = function (picture) {
  var picturesElement = pictureTemplate.cloneNode(true);
  picturesElement.querySelector('img').src = picture[0];
  picturesElement.querySelector('.picture-likes').textContent = picture[1];
  picturesElement.querySelector('.picture-comments').textContent = picture[2];
  return picturesElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPictures(pictures[i]));
}
picturesList.appendChild(fragment);

var renderGallery = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = picture[0];
  galleryOverlay.querySelector('.likes-count').textContent = picture[1];
  galleryOverlay.querySelector('.comments-count').textContent = picture[2];
  return galleryOverlay;
};
renderGallery(pictures[0]);
