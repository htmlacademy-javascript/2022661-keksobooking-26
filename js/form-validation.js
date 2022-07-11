import {TYPES_OF_HOUSE_ON_RUSSIAN} from './popup.js';

const form = document.querySelector('.ad-form');
const priceField = form.querySelector('#price');
const typeOfHouseField = form.querySelector('[name="type"]');
const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const submitButton= form.querySelector('.ad-form__submit');
const timeInField = form.querySelector('[name="timein"]');
const timeOutField = form.querySelector('[name="timeout"]');

const roomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const minPrice = {
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

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'Заголовок должен быть от 30 до 100 символов'
);

// Валидация цены
function validatePrice (value) {
  return value >= 0 && value <= 100000;
}

pristine.addValidator(
  priceField,
  validatePrice,
  'Введите значение от 0 до 100 000р.'
);

function validateMinPrice (value) {
  return value >= minPrice[typeOfHouseField.value];
}

function getMinPriceErrorMessage () {
  return `
    Мин. цена за ${TYPES_OF_HOUSE_ON_RUSSIAN[typeOfHouseField.value] === 'Квартира' ? 'квартиру' : TYPES_OF_HOUSE_ON_RUSSIAN[typeOfHouseField.value].toLowerCase()}
    должна быть не менее ${minPrice[typeOfHouseField.value]}р.
  `;
}

function minPriceHandler () {
  priceField.placeholder = minPrice[this.value];
  pristine.validate(priceField);
}

pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);
typeOfHouseField.addEventListener('change', minPriceHandler);

// Валидация количества комнат
function validateRooms () {
  return roomsOption[roomsField.value].includes(capacityField.value);
}

function getRoomsErrorMessage() {
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
}

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);
pristine.addValidator(capacityField, validateRooms);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

roomsField.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

capacityField.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Валидация времени выезда и заезда
function timeInHandler () {
  if (timeInField.value !== timeOutField.value) {
    const propertyTime = timeInField.value;
    timeOutField.value = propertyTime;
  }
  pristine.validate(timeInField);
}

function timeOutHandler () {
  if (timeOutField.value !== timeInField.value) {
    const propertyTime = timeOutField.value;
    timeInField.value = propertyTime;
  }
  pristine.validate(timeOutField);
}

timeInField.addEventListener('change', timeInHandler);
timeOutField.addEventListener('change', timeOutHandler);

//Oтправка формы
submitButton.addEventListener('click', () => {
  if (pristine.validate()) {
    form.submit();
  }
});
