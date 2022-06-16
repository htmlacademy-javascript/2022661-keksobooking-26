const TYPES_OF_HOUSE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOUSE_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const ADDS_COUNT = 10;

// Возвращает случайное число в диапозоне, если не указано количество знаков после запятой, то возвращает целое
function getRandomNumber(min, max, decimalCount = 0) {
  let result;
  try {
    if (min === max) {
      return min;
    }
    if (min > max) {
      const tmp = max;
      max = min;
      min = tmp;
    }
    if (min < 0) {
      min = min * -1;
    }
    if (max < 0) {
      max = max * -1;
    }
    // Формула генерации взята с https://myrusakov.ru/js-random-numbers.html
    const randomNumber = Math.random() * (max - min) + min;
    result = randomNumber.toFixed(decimalCount);
  } catch (error) {
    result = 'Диапозон или количество знаков после запятой указаны некорректно';
  }
  return result;
}

getRandomNumber(10, 20);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
const getRandomArrayPart = (elements) => {
  let start = getRandomNumber (0, elements.length - 1);
  let end = getRandomNumber (0, elements.length - 1);
  if (start > end) {
    const tmp = end;
    end = start;
    start = tmp;
  } else if ( start === end) {
    return [elements[start]];
  }
  return elements.slice(start, end);
};

const createAdd = () => {
  const avatarId = getRandomNumber(1,10);
  const author = {
    avatar: `img/avatars/user${avatarId < 10 ? `0${avatarId}` : avatarId }.png`,
  };
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

const adds = Array.from({length:ADDS_COUNT}, createAdd);

console.log(adds);
