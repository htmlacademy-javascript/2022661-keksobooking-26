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
