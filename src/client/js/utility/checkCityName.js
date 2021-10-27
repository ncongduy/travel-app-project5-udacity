function checkCityName(inputText) {
	console.log('::: Running checkCityName :::', inputText);
	let regex = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;

	return regex.test(inputText);
}

export { checkCityName };