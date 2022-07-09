const conditionOffHandler = function (className) {
  document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector(`.${className}`);
    const formFields = formContainer.children;
    formContainer.classList.add(`${className}--disabled`);

    for (let i = 0; i < formFields.length; i++ ) {
      const formField = formFields[i];
      formField.setAttribute('disabled', 'disabled');
    }
  });
};

conditionOffHandler('ad-form');
conditionOffHandler('map__filters');

const conditionOnHandler = function (className) {
  document.addEventListener ('click', () => {
    const formContainer = document.querySelector(`.${className}`);
    const formFields = formContainer.children;

    if (formContainer.classList.contains(`${className}--disabled`)) {
      formContainer.classList.remove(`${className}--disabled`);
    }

    for (let i = 0; i < formFields.length; i++ ) {
      const formField = formFields[i];
      if (formField.hasAttribute('disabled')) {
        formField.removeAttribute('disabled');
      }
    }
  });
};

conditionOnHandler('ad-form');
conditionOnHandler('map__filters');

