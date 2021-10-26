function scrollToElement(evt) {
	evt.preventDefault();

	const scrollToElement = document.getElementById(evt.target.dataset.scroll);
	scrollToElement.scrollIntoView({ behavior: 'smooth' });
}

function app() {
	const $ = document.querySelector.bind(document);
	const $$ = document.querySelectorAll.bind(document);

	// add event listener for search button
	const searchBtn = $('#search-btn');
	searchBtn.addEventListener('click', scrollToElement);

	// add event listener for 'back to top' button
	const backToTop = $('.back-to-top');
	backToTop.addEventListener('click', scrollToElement);
}

export { app };
