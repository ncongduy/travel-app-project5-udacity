function submitForm(evt) {
	evt.preventDefault();

	const infoElement = document.getElementById('info');
	infoElement.scrollIntoView({ behavior: 'smooth' });
}

function app() {
	const searchBtn = document.getElementById('search-btn');
	searchBtn.addEventListener('click', submitForm);
}

export { app };
