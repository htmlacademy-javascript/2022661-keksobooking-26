import {conditionOnHandler} from './page-condition.js';
import {form} from './form-validation.js';
import {similarAdds} from './popup.js';
import {createSimilarAddsPopap} from './popup.js';

const adressField = form.querySelector('[name="address"]');

const map = L.map('map-canvas')
  .on('load', () => {
    conditionOnHandler('ad-form');
    conditionOnHandler('map__filters');
  })
  .setView({
    lat: 35.680555,
    lng: 139.768765,
  }, 10);

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

const mainMarker = L.marker(
  {
    lat: 35.680555,
    lng: 139.768765,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  adressField.value = evt.target.getLatLng();
});

const similarIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

similarAdds.forEach((similarAdd) => {
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
    .addTo(map)
    .bindPopup(createSimilarAddsPopap(similarAdd));
});
