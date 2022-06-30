import {getRandomNumber} from './util.js';
import {getRandomArrayElement} from './util.js';
import {getRandomArrayPart} from './util.js';

const TYPES_OF_HOUSE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOUSE_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const ADDS_COUNT = 1;
let authorId = 1;

const createAdd = () => {
  const author = {
    avatar: `img/avatars/user${authorId < 10 ? `0${authorId}` : authorId }.png`,
  };
  authorId++;
  const location = {
    lat: getRandomNumber(35.65000, 35.70000, 5),
    lng: getRandomNumber(139.70000, 139.80000, 5),
  };
  const offer = {
    title: 'Лучшее предложение',
    address: `${location.lat}, ${location.lng}`,
    price: getRandomNumber(1000, 20000),
    type: getRandomArrayElement(TYPES_OF_HOUSE),
    rooms: getRandomNumber(1, 10),
    guests: getRandomNumber(1, 20),
    checkin: getRandomArrayElement(CHECK_TIMES),
    checkout: getRandomArrayElement(CHECK_TIMES),
    features: getRandomArrayPart(HOUSE_FEATURES),
    description: 'Просторные уютные комнаты придутся вам по душе',
    photos: getRandomArrayPart(HOUSE_PHOTOS),
  };
  return {
    author : author,
    offer : offer,
    location : location,
  };
};

const createAdds = () => Array.from({length:ADDS_COUNT}, createAdd);

export {createAdds};
