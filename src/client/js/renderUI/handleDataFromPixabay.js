export function handleDataFromPixabay(dataFromPixabay, cityName) {
	const arrayPictures = dataFromPixabay.hits;
	const cityNameHandled = Client.cityNameHandle(cityName);
	let pictureURL;
	let isHavePicture = false;

	arrayPictures.map((picture) => {
		if (picture.tags.includes(cityNameHandled)) {
			pictureURL = picture.webformatURL;
			isHavePicture = true;
		}
	});
	if (!isHavePicture) {
		pictureURL = arrayPictures[arrayPictures.length - 1].webformatURL;
	}

	return pictureURL;
}
