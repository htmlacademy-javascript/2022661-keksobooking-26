import {TYPES_OF_HOUSE_ON_RUSSIAN} from './popup.js';

const form = document.querySelector('.ad-form');
const priceField = form.querySelector('#price');
const typeOfHouseField = form.querySelector('[name="type"]');
const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const submitButton= form.querySelector('.ad-form__submit');
const timeInField = form.querySelector('[name="timein"]');
const timeOutField = form.querySelector('[name="timeout"]');

const priceSliderElement = document.querySelector('.ad-form__slider');

const ROOMS_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

// Валидация заголовка
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'Заголовок должен быть от 30 до 100 символов'
);

noUiSlider.create(priceSliderElement,{
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceSliderElement.noUiSlider.on('slide', () => {
  priceField.value = priceSliderElement.noUiSlider.get();
  pristine.validate(priceField);
});

priceField.addEventListener('change', (evt) => {
  priceSliderElement.noUiSlider.set(evt.target.value);
  pristine.validate(priceSliderElement);
});

//Валидация минимальной цены
const validateMinPrice = (value) => value >= MIN_PRICES[typeOfHouseField.value];

const getMinPriceErrorMessage = () => `
    Мин. цена за ${TYPES_OF_HOUSE_ON_RUSSIAN[typeOfHouseField.value] === 'Квартира' ? 'квартиру' : TYPES_OF_HOUSE_ON_RUSSIAN[typeOfHouseField.value].toLowerCase()}
    должна быть не менее ${MIN_PRICES[typeOfHouseField.value]}р.
`;

function minPriseHandler () {
  if (priceField.value) {
    pristine.validate(priceField);
  }
  priceField.placeholder = MIN_PRICES[this.value];
}

pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);
typeOfHouseField.addEventListener('change', minPriseHandler);

// Валидация количества комнат
const validateRooms = () => ROOMS_OPTIONS[roomsField.value].includes(capacityField.value);

const getRoomsErrorMessage = () => {
  if (capacityField.value === '0') {
    return `
    Данное количество комнат недоступно для варианта "не для гостей"
    `;
  } else if (capacityField.value === '1') {
    return `
    Данное количество комнат недоступно для 1 гостя
    `;
  } else {
    return `
      Данное количество комнат недоступно для ${capacityField.value} гостей
      `;
  }
};

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);
pristine.addValidator(capacityField, validateRooms);

roomsField.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate(roomsField);
});

capacityField.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate(roomsField);
});

// Валидация времени выезда и заезда
const timeHandler = (evt) => {
  timeInField.value = evt.target.value;
  timeOutField.value = evt.target.value;
};

timeInField.addEventListener('change', timeHandler);
timeOutField.addEventListener('change', timeHandler);

//Oтправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

submitButton.addEventListener('click', () => {
  if (pristine.validate()) {
    form.submit();
  }
});

export {form};
