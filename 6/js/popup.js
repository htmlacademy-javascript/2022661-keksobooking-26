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

const OBJECT_FIELD_MAP = {
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.js-popup__text--price',
  description: '.popup__description',
};

similarAdd.forEach(({author, offer}) => {
  const addElement = addTemplate.cloneNode(true);
  for(const key in OBJECT_FIELD_MAP) {
    const value = offer[key];
    const addElementItem= addElement.querySelector(OBJECT_FIELD_MAP[key]);
    if(value) {
      addElementItem.textContent = value;
    } else {
      addElementItem.remove();
    }
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
