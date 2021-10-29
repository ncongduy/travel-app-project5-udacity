export function renderUI(
	{ dataFromWeatherbit, dataFromPixabay },
	dateTravel,
	daysRemain,
	infoSection
) {
	let html;

	// 
	// render when error connection
	// 
	if (!dataFromWeatherbit || !dataFromPixabay) {
		html = `
		<div class="banner">
		</div>
		<div class="container-info">
			<img src="https://cdn.pixabay.com/photo/2013/04/01/09/21/connection-broken-98523_1280.png" alt="error connection">
			<ul>
				<li>					
					<p>Error connection.</p>
				</li>	
				<li>					
					<p>Server is not run correctly.</p>
				</li>				
			</ul>
		</div>
		<div class="back-to-top" data-scroll="header">
			<i class="fas fa-3x fa-arrow-alt-circle-up" data-scroll="header"></i>
		</div>
		`;
		infoSection.innerHTML = html;
		return;
	}

	// 
	// render when not found location
	// 
	if (dataFromWeatherbit.data === null) {
		html = `
		<div class="banner">
		</div>
		<div class="container-info">
			<img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_1280.jpg" alt="not find travel information">
			<ul>
				<li>					
					<p>Not found your location.</p>
				</li>	
				<li>					
					<p>Please try again or choose another place.</p>
				</li>				
			</ul>
		</div>
		<div class="back-to-top" data-scroll="header">
			<i class="fas fa-3x fa-arrow-alt-circle-up" data-scroll="header"></i>
		</div>
		`;
		infoSection.innerHTML = html;
		return;
	}

	// 
	// render when receive successful data
	// 

	// data from Weatherbit
	const { cityName, highTemp, lowTemp, timeTravel, timeRemain } =
		Client.handleDataFromWeatherbit(
			dataFromWeatherbit,
			dateTravel,
			daysRemain
		);

	// data from Pixabay
	const pictureURL = Client.handleDataFromPixabay(dataFromPixabay, cityName);

	// render to UI
	html = `
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
