export function validateForm(form, city, date, daysForecast) {
	const dateElement = document.querySelectorAll(
		'#form form div.invalid-feedback'
	)[1];
	const cityValue = city.value.trim();
	const dateValue = date.value.trim();

	if (cityValue === '' || dateValue === '') {
		form.classList.add('was-validated');
		return false;
	}

	if (daysForecast < 1 || daysForecast > 16) {
		dateElement.classList.add('invalid-date');
		return false;
	}

    dateElement.classList.remove('invalid-date');
	return true;
}
