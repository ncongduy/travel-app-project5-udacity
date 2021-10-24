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
const apiKey = process.env.API_KEY;

// save data from MeaningCloud API to variable
const data = {};

// function get data from MeaningCloud API
async function getData(url) {
	try {
		const fetchData = await fetch(url);
		const dataResponse = await fetchData.json();

		return dataResponse;
	} catch (error) {
		alert(error);
	}
}

// setup static direction to dist folder
app.use(express.static('dist'));

// routing
app.get('/', function (req, res) {
	res.sendFile('dist/index.html');
	// res.sendFile(path.resolve('src/client/views/index.html'));
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

app.post('/data', function (req, res) {
	console.log('POST', req.body);
	const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=auto&${req.body.inputData}`;
	getData(url)
		.then((dataResponse) => Object.assign(data, dataResponse))
		.then(() => res.send(data));
});

// run server at port 5000
const port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log(`Example app listening on port ${port}!`);
});
