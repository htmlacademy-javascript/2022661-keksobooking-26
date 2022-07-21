import './page-condition.js';
import {setUserFormSubmit} from './form-validation.js';
import {openSuccessMessage, openErrorMessage} from './form-message.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {filterHandler, saveAndRenderAds} from './filter.js';

getData(saveAndRenderAds, showAlert);

filterHandler();

setUserFormSubmit(openSuccessMessage, openErrorMessage);
