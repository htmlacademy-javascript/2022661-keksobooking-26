// Возвращает случайное число в диапозоне, если не указано количество знаков после запятой, то возвращает целое
function getRandomNumber(min, max, decimalCount = 0) {
  const isCorrectRange = min < max && min >= 0 && max >= 0;
  const isCorrectDecimalCount = decimalCount >= 0 && decimalCount < 100;
  let message = 'Результат: ';
  if (isCorrectRange && isCorrectDecimalCount) {
    // Формула генерации взята с https://myrusakov.ru/js-random-numbers.html
    const randomNumber = Math.random() * (max - min) + min;
    message += randomNumber.toFixed(decimalCount);
  } else if (min === max) {
    message += min;
  } else {
    message = 'Диапозон или количество знаков после запятой указаны некорректно';
  }
  return message;
}

getRandomNumber(10, 20);
