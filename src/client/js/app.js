const $ = document.querySelector.bind(document);

function scrollToElement(evt) {
	const scrollToElement = document.getElementById(evt.target.dataset.scroll);
	scrollToElement.scrollIntoView({ behavior: 'smooth' });
}

function checkCityName(cityName) {
	const cityNameCurrent = cityName.toLowerCase();
	let newCityName;

	if (cityNameCurrent.includes('city')) {
		newCityName = cityNameCurrent.replace('city', '').trim();
	} else {
		newCityName = cityNameCurrent.trim();
	}

	return newCityName;
}

function renderUI({ dataFromWeatherbit, dataFromPixabay }, daysRemain) {
	// dataFromWeatherbit
	const infoSection = $('#info');
	const cityName = dataFromWeatherbit.city_name;
	const dataWeather = dataFromWeatherbit['data'];
	const highTemp = dataWeather[dataWeather.length - 1].max_temp;
	const lowTemp = dataWeather[dataWeather.length - 1].low_temp;
	const timeTravel = new Date(
		dataWeather[dataWeather.length - 1].datetime
	).toDateString();

	let timeRemain;
	if (daysRemain > 1) {
		timeRemain = `You have ${daysRemain} days to departure.`;
	} else if (daysRemain > 0) {
		timeRemain = `You have ${daysRemain} day to departure.`;
	} else {
		timeRemain = 'Departure today.';
	}

	// dataFromPixabay
	const arrayPictures = dataFromPixabay.hits;
	const cityNameChecked = checkCityName(cityName);
	let webformatURL;
	arrayPictures.map((picture) => {
		if (picture.tags.includes(cityNameChecked)) {
			webformatURL = picture.webformatURL;
			console.log(webformatURL)
		}
	});

	// render to UI
	const html = `
		<div class="banner">
		</div>
		<div class="container-info">
			<img src="${webformatURL}" alt="picture of city">
			<ul>
				<li>
					<i class="fas fa-map-marker-alt"></i>
					<p id="location">Location: ${cityName}</p>
				</li>
				<li>
					<i class="fas fa-temperature-high"></i>
					<p id="high-temp">High temperature: ${highTemp} °C</p>
				</li>
				<li>
					<i class="fas fa-temperature-low"></i>
					<p id="low-temp">Low temperature: ${lowTemp} °C</p>
				</li>
				<li>
					<i class="fas fa-calendar-alt"></i>
					<p id="time-travel">Time travel: ${timeTravel}</p>
				</li>
				<li>
					<i class="fas fa-plane"></i>
					<p id="time-remain">${timeRemain}</p>
				</li>
			</ul>
		</div>
		<div class="back-to-top" data-scroll="header">
			<i class="fas fa-3x fa-arrow-alt-circle-up" data-scroll="header"></i>
		</div>
	`;
	infoSection.innerHTML = html;
}

async function app() {
	// add event listener for search button
	const searchBtn = $('#search-btn');
	searchBtn.addEventListener('click', (evt) => {
		evt.preventDefault();
		const city = $('#city');
		const date = $('#date');

		const dateCurrent = new Date();
		const dateTravel = new Date(date.value);
		const daysForecast =
			Math.floor(
				(dateTravel.getTime() - dateCurrent.getTime()) /
					(1000 * 60 * 60 * 24)
			) + 2;
		const daysRemain = daysForecast - 1;

		const data = { city: city.value, date: date.value, daysForecast };
		const localServer = 'http://localhost:9000/data';

		Client.postDataToServer(data, localServer)
			.then((localServer) => Client.getDataFromServer(localServer))
			.then((dataResponse) => renderUI(dataResponse, daysRemain));

		setTimeout(() => scrollToElement(evt), 1500);
	});

	// add event listener for 'back to top' button
	// const backToTop = $('.back-to-top');
	// backToTop.addEventListener('click', scrollToElement);
}

export { app, checkCityName };
