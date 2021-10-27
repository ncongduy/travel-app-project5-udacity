function scrollToElement(element) {
	const scrollToElement = document.getElementById(element.dataset.scroll);
	scrollToElement.scrollIntoView({ behavior: 'smooth' });
}

function cityNameHandle(cityName) {
	const cityNameCurrent = cityName.toLowerCase();
	let newCityName;

	if (cityNameCurrent.includes('city')) {
		newCityName = cityNameCurrent.replace('city', '').trim();
	} else {
		newCityName = cityNameCurrent.trim();
	}

	return newCityName;
}

function renderUI(
	{ dataFromWeatherbit, dataFromPixabay },
	daysRemain,
	infoSection
) {
	// dataFromWeatherbit
	if (!dataFromWeatherbit) return;
	const cityName = dataFromWeatherbit.city_name;
	const dataWeather = dataFromWeatherbit['data'];
	const highTemp = dataWeather[dataWeather.length - 1].max_temp;
	const lowTemp = dataWeather[dataWeather.length - 1].low_temp;
	const dateTime = dataWeather[dataWeather.length - 1].datetime;
	const timeTravel = new Date(dateTime).toDateString();
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
	const cityNameHandled = cityNameHandle(cityName);
	let pictureURL;
	let isHavePicture = false;
	arrayPictures.map((picture) => {
		if (picture.tags.includes(cityNameHandled)) {
			pictureURL = picture.webformatURL;
			isHavePicture = true;
		}
	});
	if (!isHavePicture) {
		pictureURL = arrayPictures[arrayPictures.length - 1].webformatURL;
	}

	// render to UI
	const html = `
		<div class="banner">
		</div>
		<div class="container-info">
			<img src="${pictureURL}" alt="picture of city">
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
	// access DOM element
	const $ = document.querySelector.bind(document);
	const searchBtn = $('#search-btn');
	const infoSection = $('#info');

	// add event listener for search button
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

		const data = { city: city.value, daysForecast };
		const localServer = 'http://localhost:9000/data';

		Client.postDataToServer(data, localServer)
			.then((localServer) => Client.getDataFromServer(localServer))
			.then((dataResponse) =>
				renderUI(dataResponse, daysRemain, infoSection)
			);

		setTimeout(() => scrollToElement(evt.target), 1500);
	});

	// when user click icon backToTop, website scroll to top
	infoSection.addEventListener('click', (evt) => {
		console.log('click info section', evt.target.className);
		if (evt.target.className === 'fas fa-3x fa-arrow-alt-circle-up') {
			scrollToElement(evt.target);
		}
	});
}

export { app, cityNameHandle };
