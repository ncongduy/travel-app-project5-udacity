// import resourse
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');

// setup server
const app = express();
app.use(cors());
// to use json
app.use(express.json());
// to use url encoded values
app.use(express.urlencoded({ extended: true }));

// using environment variable to save apiKey
dotenv.config();
const apiKeyWeatherbit = process.env.API_KEY_WEATHERBIT;
const username = process.env.USER_NAME;

//
// Start Fetch API section
//

// function get data
async function getData(url) {
	try {
		const fetchData = await fetch(url);
		const dataResponse = await fetchData.json();

		return dataResponse;
	} catch (error) {
		alert(error);
	}
}

//
// fetch API - input: city, date => output: forecast weather
//
const dataFromWeatherbit = {};

const urlGeoNames = `http://api.geonames.org/searchJSON?style=SHORT&username=${username}&maxRows=1&q=pari`;
getData(urlGeoNames)
	.then((dataResponse) => {
		const latitude = dataResponse.geonames[0].lat;
		const longitude = dataResponse.geonames[0].lng;

		return { latitude, longitude };
	})
	.then((dataGeoNames) => {
		const { latitude, longitude } = dataGeoNames;
		const urlWeatherbit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKeyWeatherbit}&lat=${latitude}&lon=${longitude}&days=16`;

		return urlWeatherbit;
	})
	.then((urlWeatherbit) => getData(urlWeatherbit))
	.then((dataResponse) => {
		Object.assign(dataFromWeatherbit, dataResponse);
		console.log(dataFromWeatherbit);
	});


//
// End Fetch API section
//

// setup static direction to dist folder
app.use(express.static('dist'));

console.log(__dirname);

// routing
app.get('/', function (req, res) {
	// res.sendFile('dist/index.html');
	res.sendFile(path.resolve('src/client/views/index.html'));
});

app.get('/test', function (req, res) {
	res.send(mockAPIResponse);
});

app.post('/test', function (req, res) {
	res.send(mockAPIResponse);
});

app.get('/data', function (req, res) {
	console.log('GET', req.body);
	res.send(data);
});

// app.post('/data', function (req, res) {
// 	console.log('POST', req.body);
// 	const url = `http://api.geonames.org/searchJSON?style=SHORT&username=ncongduy&maxRows=10&q=pari`;
// 	getDataGeoNames(url)
// 		.then((dataResponse) => Object.assign(data, dataResponse))
// 		.then(() => res.send(data));
// });

// run server at port 9000
const port = process.env.PORT || 9000;
app.listen(port, function () {
	console.log(`App listening at http://localhost:${port}`);
});
