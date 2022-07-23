import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);
const pageBody = document.querySelector('body');

const closeMessage = () => {
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');

  document.removeEventListener('click', closeMessage);
  document.removeEventListener('keydown', messageEscKeydownHandler);
};

function messageEscKeydownHandler (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const openSuccessMessage = () => {
  pageBody.append(successMessage);
  successMessage.classList.remove('hidden');

  document.addEventListener('keydown', messageEscKeydownHandler);
  document.addEventListener('click', closeMessage);
};

const openErrorMessage = () => {
  pageBody.append(errorMessage);
  errorMessage.classList.remove('hidden');

  document.addEventListener('keydown', messageEscKeydownHandler);
  document.addEventListener('click', closeMessage);
};

export {openSuccessMessage, openErrorMessage};
