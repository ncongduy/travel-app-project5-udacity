function sentimented(data) {
	let dataOutput;

	switch (data) {
		case 'P+':
			dataOutput = 'strong positive';
			break;
		case 'P':
			dataOutput = 'positive';
			break;
		case 'NEU':
			dataOutput = 'neutral';
			break;
		case 'N':
			dataOutput = 'negative';
			break;
		case 'N+':
			dataOutput = 'strong negative';
			break;
		case 'NONE':
			dataOutput = 'without polarity';
			break;
		default:
			dataOutput = 'no emotion';
	}

	return dataOutput;
}

function subjectivity(data) {
	if (data === 'OBJECTIVE') {
		return 'the text does not have any subjectivity marks.';
	} else {
		return 'the text has subjective marks.';
	}
}

function agreement(data) {
	if (data === 'AGREEMENT') {
		return 'the different elements have the same polarity.';
	} else {
		return "there is disagreement between the different elements' polarity.";
	}
}

function irony(data) {
	if (data === 'NONIRONIC') {
		return 'the text does not have any irony marks.';
	} else {
		return 'the text has irony marks.';
	}
}

function clearInputForm() {
	document.getElementById('name').value = '';
}

function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let formText = document.getElementById('name').value;
	let inputData;

	// access list element to render UI
	const listElement = document.getElementById('results-list');

	// check content user type in, which is a text or an url
	const checkFormTextIsUrl = Client.checkForUrl(formText);

	if (checkFormTextIsUrl === true) {
		inputData = 'url=' + formText;
	} else {
		listElement.innerHTML = `<li style="color:crimson;">URL is not exist. Please type another URL!</li>`;
		clearInputForm();
		return;
	}

	console.log('::: Form Submitted :::');
	clearInputForm();
	const dataPostToServer = { inputData };
	const localServer = 'http://localhost:5000/data';

	Client.postDataToServer(dataPostToServer, localServer)
		.then((localServer) => Client.getDataFromServer(localServer))
		.then((data) => {
			listElement.innerHTML = `
				<li>Status: ${data.status.msg}</li>
				<li>URL: ${formText}</li>
				<li>Sentimented: ${sentimented(data.score_tag)}</li>
				<li>Agreement: ${agreement(data.agreement)}</li>
				<li>Subjectivity: ${subjectivity(data.subjectivity)}</li>
				<li>Irony: ${irony(data.irony)}</li>
			`;
		})
		.catch((error) => alert(error));
}

export { handleSubmit, sentimented, subjectivity, agreement, irony };
