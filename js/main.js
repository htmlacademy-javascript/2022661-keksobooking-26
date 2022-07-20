import './page-condition.js';
import {renderAdds} from './map.js';
import {setUserFormSubmit} from './form-validation.js';
import {openSuccessMessage, openErrorMessage} from './form-message.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData(renderAdds, showAlert);

setUserFormSubmit(openSuccessMessage, openErrorMessage);
