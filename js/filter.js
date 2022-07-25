import {renderAds, clearLayersOnMap} from './map.js';
import {debounce} from './debounce.js';
import {RERENDER_DELAY} from './util.js';

const MAP_ADS_COUNT = 10;
const DEFAULT_VALUE = 'any';
const PRICES_RANGE = {
  'any': [0, Infinity],
  'middle': [10000, 50000],
  'low': [0, 10000],
  'high': [50000, Infinity],
};

const filterform = document.querySelector('.map__filters');
const typeOfHouseFilter = filterform.querySelector('#housing-type');
const priceFilter = filterform.querySelector('#housing-price');
const roomsFilter = filterform.querySelector('#housing-rooms');
const guestsFilter = filterform.querySelector('#housing-guests');
const featuresFilters = filterform.querySelectorAll('.map__checkbox');

let adsList = [];

const saveAndRenderAds = (ads) => {
  adsList = ads;
  renderAds(adsList);
};

const filterChange = () => {
  clearLayersOnMap();
  renderAds(adsList);
};

const filterAdsOnMap = (ads) => {
  const filteredAds = [];
  for (const ad of ads) {
    if (filteredAds.length === MAP_ADS_COUNT) {
      break;
    }

    const isCheckOfferType = ad.offer.type === typeOfHouseFilter.value || typeOfHouseFilter.value === DEFAULT_VALUE;
    const isCheckPrice = ad.offer.price >= PRICES_RANGE[priceFilter.value][0] && ad.offer.price <= PRICES_RANGE[priceFilter.value][1];
    const isCheckRooms = parseInt(ad.offer.rooms, 10) === parseInt(roomsFilter.value, 10) || roomsFilter.value === DEFAULT_VALUE;
    const isCheckGuest = parseInt(ad.offer.guests, 10) === parseInt(guestsFilter.value, 10) || guestsFilter.value === DEFAULT_VALUE;

    const checkedFeatures = [];
    const adOfferFeatures = ad.offer.features;
    featuresFilters.forEach((featuresFilter) => {
      if (featuresFilter.checked) {
        checkedFeatures.push(featuresFilter.value);
        return checkedFeatures;
      }
    });

    const isCheckedFeatures = checkedFeatures.length === 0 || (adOfferFeatures && checkedFeatures.every((feature) => adOfferFeatures.includes(feature)));

    if (isCheckPrice &&
      isCheckOfferType &&
      isCheckRooms &&
      isCheckGuest &&
      isCheckedFeatures) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};

const filterHandler = () => {
  filterform.addEventListener('change', debounce(filterChange, RERENDER_DELAY));
};

//Очистка фильтра
const cleanFilter = () => {
  typeOfHouseFilter.value = DEFAULT_VALUE;
  priceFilter.value = DEFAULT_VALUE;
  roomsFilter.value = DEFAULT_VALUE;
  guestsFilter.value = DEFAULT_VALUE;
  featuresFilters.forEach((featuresFilter) => {
    featuresFilter.checked = false;
  });
  filterChange();
};

export {filterAdsOnMap, filterHandler, filterChange, saveAndRenderAds, cleanFilter};
