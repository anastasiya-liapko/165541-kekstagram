'use strict';

var comments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getUrl = function (min, max) {
  var url = [];
  for (var i = 0; i < max; i++) {
    url[i] = 'photos/{{' + (i + 1) + '}}.jpg';
  }
  return url;
};

var getLikes = function (min, max) {
  var likes = [];
  for (var i = 0; i < 25; i++) {
    likes[i] = min - 0.5 + Math.random() * (max - min + 1);
    likes[i] = Math.round(likes[i]);
  }
  return likes;
};

var getComment = function () {
  var comment = [];
  for (var i = 0; i < 25; i++) {
    var number = Math.floor(Math.random() * comments.length);
    comment[i] = comments[number];
  }
  return comment;
};

var createPictures = function (url, likes, comment) {
  var pictures = [];
  for (var i = 0; i < 25; i++) {
    pictures[i] = [url[i], likes[i], comment[i]];
  }
  return pictures;
};

var url = getUrl(1, 25);
var likes = getLikes(15, 200);
var comment = getComment(comments);
var pictures = createPictures(url, likes, comment);

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var galleryOverlay = document.querySelector('.gallery-overlay');

var renderPictures = function () {
  var picturesElement = pictureTemplate.cloneNode(true);
  picturesElement.querySelectorAll('img').src = pictures[i].url;
  picturesElement.querySelector('.picture-likes').textContent = pictures[i].likes;
  picturesElement.querySelector('.picture-comments').textContent = pictures[i].comment;
  return picturesElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPictures(pictures[i]));
}
picturesList.appendChild(fragment);

document.querySelector('.upload-overlay').classList.add('hidden');
document.querySelector('.gallery-overlay').classList.remove('hidden');

var renderGallery = function () {
  var galleryElement = pictureTemplate.cloneNode(true);
  galleryElement.querySelector('.gallery-overlay-image').src = pictures[0].url;
  galleryElement.querySelector('.likes-count').textContent = pictures[0].likes;
  galleryElement.querySelector('.comments-count').textContent = pictures[0].comment;
  galleryOverlay.appendChild(galleryElement);
};

renderGallery(pictures[0]);
