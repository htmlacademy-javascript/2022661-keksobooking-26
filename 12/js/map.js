import {conditionOnHandler} from './page-condition.js';
import {adressField} from './form-validation.js';
import {createSimilarAdsPopap} from './popup.js';
import {filterAdsOnMap} from './filter.js';

const MAIN_COORDINATES = {
  lat: 35.680555,
  lng: 139.768765,
};

const map = L.map('map-canvas')
  .on('load', () => {
    conditionOnHandler('ad-form');
  })
  .setView( MAIN_COORDINATES, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker( MAIN_COORDINATES, {
  draggable: true,
  icon: mainIcon,
});

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  adressField.value = evt.target.getLatLng();
});

const resetMainMarker = () => {
  mainMarker.setLatLng(MAIN_COORDINATES);
};

const similarIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);
const clearLayersOnMap = () => markerGroup.clearLayers();

const renderAds = (ads) => {
  ads = filterAdsOnMap(ads);
  ads.forEach((similarAdd) => {
    const {location} = similarAdd;
    const similarMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: similarIcon,
      },
    );

    similarMarker
      .addTo(markerGroup)
      .bindPopup(createSimilarAdsPopap(similarAdd));
  });
};

export {renderAds, resetMainMarker, clearLayersOnMap, MAIN_COORDINATES};
