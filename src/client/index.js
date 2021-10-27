import { app } from './js/app';
import { postDataToServer } from './js/fetchAPI/postDataToServer';
import { getDataFromServer } from './js/fetchAPI/getDataFromServer';
import { scrollToElement } from './js/utility/scrollToElement';
import { cityNameHandle } from './js/utility/cityNameHandle';
import { renderUI } from './js/renderUI/renderUI';
import { handleDataFromWeatherbit } from './js/renderUI/handleDataFromWeatherbit';
import { handleDataFromPixabay } from './js/renderUI/handleDataFromPixabay';

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
	scrollToElement,
	cityNameHandle,
	renderUI,
	handleDataFromWeatherbit,
	handleDataFromPixabay,
};
