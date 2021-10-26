function scrollToElement(evt) {
	const scrollToElement = document.getElementById(evt.target.dataset.scroll);
	scrollToElement.scrollIntoView({ behavior: 'smooth' });
}

function app() {
	// declare variable
	const $ = document.querySelector.bind(document);

	// add event listener for search button
	const searchBtn = $('#search-btn');
	searchBtn.addEventListener('click', (evt) => {
		evt.preventDefault();
		const city = $('#city');
		const date = $('#date');

		const dateCurrent = new Date();
		const dateTravel = new Date(date.value);
		const waitingDate =
			Math.floor(
				(dateTravel.getTime() - dateCurrent.getTime()) /
					(1000 * 60 * 60 * 24)
			) + 1;

		const data = { city: city.value, date: date.value, waitingDate };
		const localServer = 'http://localhost:9000/data';

		Client.postDataToServer(data, localServer);
		scrollToElement(evt);
	});

	// add event listener for 'back to top' button
	const backToTop = $('.back-to-top');
	backToTop.addEventListener('click', scrollToElement);
}

export { app };
