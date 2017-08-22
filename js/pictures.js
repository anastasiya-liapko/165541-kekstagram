'use strict';

var picture = [

  getUrl = function (min, max) {
    var url;
    for (var i = min; i <= max; i++) {
      url = 'photos/{{' + i + '}}.jpg';
    }
    return url;
  },

  getLikes = function (min, max) {
    var likes = min - 0.5 + Math.random() * (max - min + 1);
    likes = Math.round(likes);
    return likes;
  },

  comments: ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']

];

picture.getUrl(1, 25);
picture.getLikes(15, 200);

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var galleryOverlay = document.querySelector('.gallery-overlay');

var renderPicture = function () {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelectorAll('img').src = picture.getUrl;
  pictureElement.querySelector('.picture-likes').textContent = picture.getLikes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments[i];
  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < picture.length; i++) {
  fragment.appendChild(renderPicture(picture.getUrl, picture.getLikes, picture.comments));
}
picturesList.appendChild(fragment);

document.querySelector('.upload-overlay').classList.add('hidden');
document.querySelector('.gallery-overlay').classList.remove('hidden');

var renderGallery = function () {
  var galleryElement = pictureTemplate.cloneNode(true);
  galleryElement.querySelector('.gallery-overlay-image').src = picture.getUrl(1);
  galleryElement.querySelector('.likes-count').textContent = picture.getLikes(15, 200);
  galleryElement.querySelector('.comments-count').textContent = picture.comments[i];
  galleryOverlay.appendChild(galleryElement);
};
