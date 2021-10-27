export function cityNameHandle(cityName) {
	const cityNameCurrent = cityName.toLowerCase();
	let newCityName;

	if (cityNameCurrent.includes('city')) {
		newCityName = cityNameCurrent.replace('city', '').trim();
	} else {
		newCityName = cityNameCurrent.trim();
	}

	return newCityName;
}
