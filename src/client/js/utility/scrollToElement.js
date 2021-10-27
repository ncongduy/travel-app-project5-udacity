export function scrollToElement(element) {
	const scrollToElement = document.getElementById(element.dataset.scroll);
	scrollToElement.scrollIntoView({ behavior: 'smooth' });
}
