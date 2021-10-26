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
const username = process.env.USER_NAME_GEONAMES;
const apiKeyWeatherbit = process.env.API_KEY_WEATHERBIT;
const apiKeyPixabay = process.env.API_KEY_PIXABAY;

// function fetch data
async function fetchData(url) {
	try {
		const data = await fetch(url);
		const dataResponse = await data.json();

		return dataResponse;
	} catch (error) {
		alert(error);
	}
}

//
// function getData and save to variable
//
const dataFromWeatherbit = {};
const dataFromPixabay = {};

function getData() {
	const urlGeoNames = `http://api.geonames.org/searchJSON?style=SHORT&username=${username}&maxRows=1&q=ho%20chi%20minh`;
	fetchData(urlGeoNames)
		.then((dataGeoNames) => {
			const latitude = dataGeoNames.geonames[0].lat;
			const longitude = dataGeoNames.geonames[0].lng;

			return { latitude, longitude };
		})
		.then((latitudeAndLongitude) => {
			const { latitude, longitude } = latitudeAndLongitude;
			// const urlWeatherbitCurrent = `https://api.weatherbit.io/v2.0/current?key=${apiKeyWeatherbit}&lat=${latitude}&lon=${longitude}`;
			const urlWeatherbitForecast = `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKeyWeatherbit}&lat=${latitude}&lon=${longitude}&days=16`;

			return urlWeatherbitForecast;
		})
		.then((urlWeatherbitForecast) => fetchData(urlWeatherbitForecast))
		.then((dataWeatherbit) => {
			Object.assign(dataFromWeatherbit, dataWeatherbit);
			return dataFromWeatherbit.city_name;
		})
		.then((cityName) => {
			const urlPixabay = `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${cityName}&image_type=photo&pretty=true`;
			return fetchData(urlPixabay);
		})
		.then((dataPixabay) => Object.assign(dataFromPixabay, dataPixabay))
		.catch((error) => console.log(error));
}

getData();

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

app.get('/weatherbit', function (req, res) {
	console.log('GET', req.body);
	res.send(dataFromWeatherbit);
});

app.get('/pixabay', function (req, res) {
	console.log('GET', req.body);
	res.send(dataFromPixabay);
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
