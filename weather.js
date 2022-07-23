'use strict';

const celsiToFahren = (temp) => Math.trunc(temp * 9 / 5 + 32);

function parseWeather(res) {
  let Forecast = [];
  let high;
  let low;
  console.log(res);

  res.data.data.map(element => {
    low = celsiToFahren(element.low_temp);
    high = celsiToFahren(element.high_temp);

    Forecast.push({
      "description": `Low of ${low}, high of ${high} with ${element.weather.description.toLowerCase()}`,
      "date": element.datetime
    });
  });

  return Forecast;
}

module.exports = {parseWeather};
