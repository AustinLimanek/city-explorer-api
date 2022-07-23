'use strict';

function parseMovies(res) {
  let cityMovies = [];

  res.map(element => {
    cityMovies.push({
      "title": element.original_title,
      "overview": element.overview,
      "average_votes": element.vote_average,
      "total_votes": element.vote_count,
      "image_url": "https://image.tmdb.org/t/p/w500" + element.poster_path,
      "popularity": element.popularity,
      "released_on": element.release_date
    });
  });

  return cityMovies;

}

module.exports = { parseMovies };
