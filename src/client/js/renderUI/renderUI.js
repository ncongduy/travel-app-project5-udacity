export function renderUI(
	{ dataFromWeatherbit, dataFromPixabay },
	daysRemain,
	infoSection
) {
	// data from Weatherbit
	const { cityName, highTemp, lowTemp, timeTravel, timeRemain } =
		Client.handleDataFromWeatherbit(dataFromWeatherbit, daysRemain);

	// data from Pixabay
	const pictureURL = Client.handleDataFromPixabay(dataFromPixabay, cityName);

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
