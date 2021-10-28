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

//
// function getData; input: city, date, daysForecast; output: save data to variable dataFromWeatherbit, dataFromPixabay
//
const dataFromWeatherbit = {};
const dataFromPixabay = {};

function notFoundData() {
	Object.assign(dataFromWeatherbit, { data: null });
	Object.assign(dataFromPixabay, { data: null });

	return { dataFromWeatherbit, dataFromPixabay };
}

function cityNameHandle(cityName) {
	const cityNameCurrent = cityName.toLowerCase();
	let newCityName;

	if (cityNameCurrent.includes('city')) {
		newCityName = cityNameCurrent.replace('city', '').trim();
	} else {
		newCityName = cityNameCurrent.trim();
	}

	return newCityName;
}

async function getData(data) {
	try {
		//
		// fetch data from GeoNames
		//
		const urlGeoNames = `http://api.geonames.org/searchJSON?style=SHORT&username=${username}&maxRows=1&q=${data.city}`;
		const fetchGeoNames = await fetch(urlGeoNames);
		const dataGeoNames = await fetchGeoNames.json();

		// validate data from GeoNames
		if (dataGeoNames.totalResultsCount === 0) {
			return notFoundData();
		}

		const latitude = dataGeoNames.geonames[0].lat;
		const longitude = dataGeoNames.geonames[0].lng;

		//
		// fetch data from Weatherbit
		//
		const urlWeatherbitForecast = `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKeyWeatherbit}&lat=${latitude}&lon=${longitude}&days=${data.daysForecast}`;
		const fetchWeatherbit = await fetch(urlWeatherbitForecast);
		const dataWeatherbit = await fetchWeatherbit.json();
		Object.assign(dataFromWeatherbit, dataWeatherbit);
		const cityName = dataFromWeatherbit.city_name;

		// validate data from Weatherbit
		if (data.city.trim().toLowerCase() !== cityNameHandle(cityName)) {
			return notFoundData();
		}

		//
		// fetch data from Pixabay
		//
		const urlPixabay = `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${cityName}&image_type=photo&pretty=true`;
		const fetchPixabay = await fetch(urlPixabay);
		const dataPixabay = await fetchPixabay.json();
		Object.assign(dataFromPixabay, dataPixabay);

		return { dataFromWeatherbit, dataFromPixabay };
	} catch (error) {
		console.log(error);
	}
}

// getData({ city: 'Helsink', daysForecast: 3 });
// getData({ city: 'Ho Chi Min', daysForecast: 3 });

// setup static direction to dist folder
app.use(express.static('dist'));

console.log(__dirname);

// routing
app.get('/', function (req, res) {
	res.sendFile('dist/index.html');
	// res.sendFile(path.resolve('src/client/views/index.html'));
});

app.get('/test', function (req, res) {
	res.send(mockAPIResponse);
});

app.post('/test', function (req, res) {
	res.send(req.body);
});

app.get('/data', function (req, res) {
	console.log('GET', req.query);
	res.send({ dataFromWeatherbit, dataFromPixabay });
});

app.post('/data', function (req, res) {
	console.log('POST', req.body);
	getData(req.body)
		.then((dataReceive) => res.send(dataReceive))
		.catch((error) => console.log(error));
});

// run server at port 9000
const port = process.env.PORT || 9000;
app.listen(port, function () {
	console.log(`App listening at http://localhost:${port}`);
});
