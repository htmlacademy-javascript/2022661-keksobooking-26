const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'Заголовок должен быть от 30 до 100 символов'
);

function validatePrice (value) {
  return value >= 0 && value <= 100000;
}

pristine.addValidator(
  form.querySelector('#price'),
  validatePrice,
  'Введите значение от 0 до 100 000р.'
);

const roomsField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const roomsOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей'],
};

roomsField.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

capacityField.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

function validateRooms () {
  return roomsOption[roomsField.value].includes(capacityField.value);
}

function getRoomsErrorMessage() {
  return `Невозможно выбрать '${roomsField.value}' для '${capacityField.value}'`;
}

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);
pristine.addValidator(capacityField, validateRooms);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
