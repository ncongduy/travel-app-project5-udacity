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

		// declare variable
		const dateCurrent = new Date();
		const dateTravel = new Date(date.value);

		const daysForecast =
			Math.floor(
				(dateTravel.getTime() - dateCurrent.getTime()) /
					(1000 * 60 * 60 * 24)
			) + 2;
		const daysRemain = daysForecast - 1;

		// validate data user type in
		if (!Client.validateForm(city, date, daysForecast)) return;

		// send request to server
		const data = { city: city.value, daysForecast };
		const localServer = 'http://localhost:9000/data';

		Client.postDataToServer(data, localServer)
			.then((localServer) => Client.getDataFromServer(localServer))
			.then((dataResponse) => {
				// save to localStorage
				const database = [dataResponse, dateTravel, daysRemain];
				localStorage.setItem('database', JSON.stringify(database));

				// render to UI
				Client.renderUI(
					dataResponse,
					dateTravel,
					daysRemain,
					infoSection
				);
			})
			.then(() => {
				$('#city').value = '';
				$('#date').value = '';
			})
			.then(() => Client.scrollToElement(evt.target))
			.catch((err) => console.log(err));
	});

	// when user click icon backToTop, website scroll to top
	infoSection.addEventListener('click', (evt) => {
		if (evt.target.className === 'fas fa-3x fa-arrow-alt-circle-up') {
			Client.scrollToElement(evt.target);
		}
	});

	// render UI when user reload website
	window.addEventListener('load', () => {
		// receive data from localStorage
		const dataFromLocalStorage =
			JSON.parse(localStorage.getItem('database')) || [];
		const [dataResponse, dateTravel, daysRemain] = dataFromLocalStorage;

		// validate data from localStorage
		if (!dataResponse || Object.keys(dataResponse).length === 0) {
			console.log('Clear old render if have error connection.');
			infoSection.innerHTML = '';
			return;
		}

		// render to UI
		Client.renderUI(dataResponse, dateTravel, daysRemain, infoSection);
	});
}

export { app };
