import {createAdds} from './data.js';

const map = document.querySelector('.map__canvas');

const addTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAdd = createAdds();

const TYPES_OF_HOUSE_ON_RUSSIAN = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

similarAdd.forEach(({author, offer}) => {
  const addElement = addTemplate.cloneNode(true);
  if (offer.title) {
    addElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    addElement.querySelector('.popup__title').remove();
  }

  if (offer.address) {
    addElement.querySelector('.popup__text--address').textContent = offer.address;
  } else {
    addElement.querySelector('.popup__text--address').remove();
  }

  if (offer.price) {
    addElement.querySelector('.js-popup__text--price').textContent = offer.price;
  } else {
    addElement.querySelector('.js-popup__text--price').remove();
  }

  if (offer.type) {
    addElement.querySelector('.popup__type').textContent =  TYPES_OF_HOUSE_ON_RUSSIAN[offer.type];
  } else {
    addElement.querySelector('.popup__type').remove();
  }

  if (offer.rooms) {
    addElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    addElement.querySelector('.popup__text--capacity').remove();
  }

  if (offer.checkin) {
    addElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    addElement.querySelector('.popup__text--time').remove();
  }

  const featuresContainer = addElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const offerFeatures = offer.features;

  if (offerFeatures.length > 0) {
    featuresList.forEach((featuresListItem) => {
      const isContains = offerFeatures.some(
        (offerFeature) => featuresListItem.classList.contains(`popup__feature--${offerFeature}`)
      );

      if (!isContains) {
        featuresListItem.remove();
      }
    });
  } else {
    featuresContainer.remove();
  }

  if (offer.description) {
    addElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    addElement.querySelector('.popup__description').remove();
  }

  const photoContainer = addElement.querySelector('.popup__photos');
  const photoItem = photoContainer.querySelector('.popup__photo');

  const offerPhotos = offer.photos;

  if (offerPhotos.length > 0) {
    offerPhotos.forEach((photo) => {
      const clonedPhotoItem = photoItem.cloneNode(true);
      clonedPhotoItem.src = photo;
      photoContainer.appendChild(clonedPhotoItem);
      photoItem.remove();
    }
    );
  } else {
    photoContainer.remove();
  }

  if (author.avatar) {
    addElement.querySelector('.popup__avatar').src = author.avatar;
  }
  else {
    addElement.querySelector('.popup__avatar').remove();
  }

  map.appendChild(addElement);
});
