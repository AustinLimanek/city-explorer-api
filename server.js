'use strict';

require('dotenv').config();
const express = require('express');
// CORS - cross origin resource sharing
// origin - the beginning of your url
const cors = require('cors');
//const weather = require('./data/weather.json'); //was ./data.json also changed weather from data
const axios = require('axios').default;


// singleton ( there can only be one!! )
const app = express(); // returns an object, with methods designed to handle Requests.
const PORT = process.env.PORT; //use 3000 -> process.env.PORT

// enable cross origin resource sharing between localhost:3001 and any other url that may make a request.
app.use(cors());

//provide the app object, with verbs and paths
app.get('/hello', (request, response) => {
  console.log(request);
  // do something
  response.send('hey there'); // every callback must send back a response.
});

// route with query parameters
app.get('/params', (request, response) => {

  console.log(request.query);

  response.send('Thanks for the parameters');
});

// app.get('/weather', (request, response) => {
//   //You could also use the .find method to do similar logic
//   let cityName = request.query.city;

//   //console.log(response);
//   let cities = weather.map(element => element.city_name.toLowerCase());
//   if (cityName) {
//     if (cities.includes(cityName)) {
//       let i = cities.indexOf(cityName);
//       let Forecast = [];

//       weather[i].data.map(element => Forecast.push({
//         "description": `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description.toLowerCase()}`,
//         "date": element.datetime
//       })
//       );
//       console.log(Forecast);
//       response.send(Forecast);
//     }
//     else {
//       response.status(404).send('City not found');
//     }
//   }
//   else {
//     response.status(400).send('Please give me a city name!');
//   }

// });

app.get('/weather', (request, response) => {
  //You could also use the .find method to do similar logic
  let cityName = request.query.city;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`;

  axios.get(url).then(res => {
    console.log(res);

    if (cityName === res.data.city_name.toLowerCase()) {
      let Forecast = [];
      res.data.data.map(element => Forecast.push({
        "description": `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description.toLowerCase()}`,
        "date": element.datetime
      }));
      response.send(Forecast);
    }
  });
});


//   let cities = res.data.map(element => element.city_name.toLowerCase());
//   if (cityName) {
//     if (cities.includes(cityName)) {
//       let i = cities.indexOf(cityName);
//       let Forecast = [];
//       res[i].data.map(element => Forecast.push({
//         "description": `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.res.description.toLowerCase()}`,
//         "date": element.datetime
//       }));
//       response.send(Forecast);
//     } else {
//       response.status(404).send('City not found');
//     }
//   }
//   else {
//     response.status(400).send('Please give me a city name!');
//   }
// })
//   .catch(e => console.log(e));


// app.get('/pokemon', (request, response) => {

//   let pokemonName = request.query.pokemon;

//   if (pokemonName) {
//     if (data.pokemon.includes(pokemonName)) {
//       response.send(data.pokemon);
//     } else {
//       response.status(404).send('Pokemon not found');
//     }
//   } else {
//     response.status(400).send('Please give me a pokemon name!');
//   }

// });

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
