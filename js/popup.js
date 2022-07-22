const adTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

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

const createSimilarAdsPopap = (similarAd) => {
  const {offer,author} = similarAd;
  const adElement = adTemplate.cloneNode(true);
  for(const key in OBJECT_FIELD_MAP) {
    const value = similarAd.offer[key];
    const adElementItem= adElement.querySelector(OBJECT_FIELD_MAP[key]);
    if(value) {
      adElementItem.textContent = value;
    } else {
      adElementItem.remove();
    }
  }

  if (offer.type) {
    adElement.querySelector('.popup__type').textContent =  TYPES_OF_HOUSE_ON_RUSSIAN[offer.type];
  } else {
    adElement.querySelector('.popup__type').remove();
  }

  if (offer.rooms) {
    adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    adElement.querySelector('.popup__text--capacity').remove();
  }

  if (offer.checkin) {
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    adElement.querySelector('.popup__text--time').remove();
  }

  const featuresContainer = adElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const offerFeatures = offer.features;

  if (offerFeatures) {
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

  const photoContainer = adElement.querySelector('.popup__photos');
  const photoItem = photoContainer.querySelector('.popup__photo');

  const offerPhotos = offer.photos;

  if (offerPhotos) {
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
    adElement.querySelector('.popup__avatar').src = author.avatar;
  }
  else {
    adElement.querySelector('.popup__avatar').remove();
  }

  return adElement;
};

export {TYPES_OF_HOUSE_ON_RUSSIAN, createSimilarAdsPopap};
