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
  addElement.querySelector('.popup__title').textContent = offer.title;
  addElement.querySelector('.popup__text--address').textContent = offer.address;
  addElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  addElement.querySelector('.popup__type').textContent =  TYPES_OF_HOUSE_ON_RUSSIAN[offer.type];
  addElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  addElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresContainer = addElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const offerFeatures = offer.features;

  featuresList.forEach((featuresListItem) => {
    const isContains = offerFeatures.some(
      (offerFeature) => featuresListItem.classList.contains(`popup__feature--${offerFeature}`)
    );

    if (!isContains) {
      featuresListItem.remove();
    }
  });

  addElement.querySelector('.popup__description').textContent = offer.description;

  const photoContainer = addElement.querySelector('.popup__photos');
  const photoItem = photoContainer.querySelector('.popup__photo');

  const offerPhotos = offer.photos;

  offerPhotos.forEach((photo) => {
    const clonedPhotoItem = photoItem.cloneNode(true);
    clonedPhotoItem.src = photo;
    photoContainer.appendChild(clonedPhotoItem);
    photoItem.remove();
  }
  );

  addElement.querySelector('.popup__avatar').src = author.avatar;

  map.appendChild(addElement);
});
