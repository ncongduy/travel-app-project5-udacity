function checkForUrl(inputText) {
	console.log('::: Running checkForName :::', inputText);
	let regex =
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

	return regex.test(inputText);
}

export { checkForUrl };
