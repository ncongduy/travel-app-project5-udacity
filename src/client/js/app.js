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
				Client.renderUI(dataResponse, daysRemain, infoSection)
			);

		setTimeout(() => Client.scrollToElement(evt.target), 1500);
	});

	// when user click icon backToTop, website scroll to top
	infoSection.addEventListener('click', (evt) => {
		if (evt.target.className === 'fas fa-3x fa-arrow-alt-circle-up') {
			Client.scrollToElement(evt.target);
		}
	});
}

export { app };
