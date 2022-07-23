'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors');
const axios = require('axios').default;
const app = express();
app.use(cors());
const { parseWeather } = require('./weather.js');
const { parseMovies } = require('./movies.js');

async function handleRequest(url) {
  try {
    let response = await axios.get(url);
    return response;
  }
  catch(e){
    throw new Error();
  }
}

app.get('/weather', async (request, response) => {
  let cityName = request.query.city;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`;

  try{
    let res = await handleRequest(url);
    if (cityName === res.data.city_name.toLowerCase()){
      let Forecast = parseWeather(res);
      response.send(Forecast);
    }
  }
  catch(e){
    console.log(e);
  }
});

app.get('/movies', async (request, response) => {
  let cityName = request.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityName}`;

  try{
    let movies = await handleRequest(url);
    if (movies.data.results.length){
      let cityMovies = parseMovies(movies.data.results);
      response.send(cityMovies);
    }
  }
  catch(e){
    console.log(e);
  }
});

app.get('/error', (request, response) => {

  throw new Error('Server not happy!!');

});

// error handlers take a special 1st parameter, that will be any error thrown from another route handler
app.use('*', (error, request, response, next) => {
  console.log(error);
  response.status(500).send(error);
});

// put error handlers down here
app.use('*', (request, response) => {
  console.log('catch all route hit');
  response.status(404).send('Route Not found :(');
});

// opens up the server for requests
app.listen(PORT, () => {
  console.log('Server is running on port :: ' + PORT);
});
