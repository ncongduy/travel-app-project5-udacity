export function validateForm(form, city, date, daysForecast) {
	const dateElement = document.querySelectorAll(
		'#form form div.invalid-feedback'
	);
	const cityValue = city.value.trim();
	const dateValue = date.value.trim();

	if (cityValue === '' || dateValue === '') {
		form.classList.add('was-validated');
		return false;
	}

	if (!Client.checkCityName(cityValue)) {
		dateElement[0].classList.add('invalid-form');
		return false;
	}

	dateElement[0].classList.remove('invalid-form');


	if (daysForecast < 1 || daysForecast > 16) {
		dateElement[1].classList.add('invalid-form');
		return false;
	}

	dateElement[1].classList.remove('invalid-form');
	return true;
}
