import { app } from './js/app';
import { postDataToServer } from './js/fetchAPI/postDataToServer';
import { getDataFromServer } from './js/fetchAPI/getDataFromServer';
import { renderUI } from './js/renderUI/renderUI';
import { handleDataFromWeatherbit } from './js/renderUI/handleDataFromWeatherbit';
import { handleDataFromPixabay } from './js/renderUI/handleDataFromPixabay';
import { scrollToElement } from './js/utility/scrollToElement';
import { cityNameHandle } from './js/utility/cityNameHandle';
import { validateForm } from './js/utility/validateForm';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/main.scss';
import './styles/footer.scss';
import './styles/responsive.scss';

app();

export {
	app,
	postDataToServer,
	getDataFromServer,
	renderUI,
	handleDataFromWeatherbit,
	handleDataFromPixabay,
	scrollToElement,
	cityNameHandle,
	validateForm,
};
