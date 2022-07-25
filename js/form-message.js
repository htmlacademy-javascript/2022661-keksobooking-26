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

const messageCloseHandler = () => {
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');

  document.removeEventListener('click', messageCloseHandler);
  document.removeEventListener('keydown', messageEscKeydownHandler);
};

function messageEscKeydownHandler (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    messageCloseHandler();
  }
}

const openSuccessMessage = () => {
  pageBody.append(successMessage);
  successMessage.classList.remove('hidden');

  document.addEventListener('keydown', messageEscKeydownHandler);
  document.addEventListener('click', messageCloseHandler);
};

const openErrorMessage = () => {
  pageBody.append(errorMessage);
  errorMessage.classList.remove('hidden');

  document.addEventListener('keydown', messageEscKeydownHandler);
  document.addEventListener('click', messageCloseHandler);
};

export {openSuccessMessage, openErrorMessage};
