export function validateForm(city, date, daysForecast) {
	const dateElement = document.querySelectorAll(
		'#form form div.invalid-feedback'
	);
	const cityValue = city.value.trim();
	const dateValue = date.value.trim();

	const currentDate = new Date();
	let maxDate = new Date();
	maxDate.setDate(currentDate.getDate() + 15);

	// validate city name
	if (cityValue === '') {
		dateElement[0].classList.add('invalid-form');
		dateElement[0].textContent = `Please provide a city name.`;		
		return false;
	} else {
		dateElement[0].classList.remove('invalid-form');
	}

	if (!Client.checkCityName(cityValue)) {
		dateElement[0].classList.add('invalid-form');
		dateElement[0].textContent = `Please provide a valid city.`;
		return false;
	} else {
		dateElement[0].classList.remove('invalid-form');
	}

	// validate date
	if (dateValue === '') {		
		dateElement[1].classList.add('invalid-form');
		dateElement[1].textContent = `Please provide a travel date.`;
		return false;
	} else {
		dateElement[1].classList.remove('invalid-form');
	}

	if (daysForecast < 1 || daysForecast > 16) {
		dateElement[1].classList.add('invalid-form');
		dateElement[1].textContent = `A valid date is from ${currentDate.toDateString()} to ${maxDate.toDateString()}.`;
		return false;
	} else {
		dateElement[1].classList.remove('invalid-form');
	}

	return true;
}
