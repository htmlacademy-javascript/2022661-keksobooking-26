import {FILE_TYPES} from './util.js';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const livingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const livingPreviewContainer = document.querySelector('.ad-form__photo');
const livingPreview = document.createElement('img');

const DEFAULT_PHOTO_SRC = 'img/muffin-grey.svg';

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const checkType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (checkType) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

livingPhotoChooser.addEventListener('change', () => {
  const file = livingPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const checkType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (checkType) {
    livingPreviewContainer.append(livingPreview);
    livingPreview.src = URL.createObjectURL(file);
    livingPreview.width = '70';
    livingPreview.height = '70';
  }
});

const removePhoto = () => {
  livingPreview.remove();
  avatarPreview.src = DEFAULT_PHOTO_SRC;
};

export {removePhoto};
