const ALERT_SHOW_TIME = 5000;

// Возвращает случайное число в диапозоне, если не указано количество знаков после запятой, то возвращает целое
const getRandomNumber = (min, max, decimalCount = 0) => {
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
};

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const RERENDER_DELAY = 500;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '100px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getRandomArrayElement, getRandomArrayPart, isEscapeKey, showAlert, RERENDER_DELAY};
