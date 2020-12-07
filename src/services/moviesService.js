import http from './httpService';
import config from '../config.json';

function getMovieUrl(id) {
 return config.apiUrl + '/movies/' + id
}

export function getMovies() {
  return http.get(config.apiUrl + '/movies');
}

export function deleteMovie(movieId) {
  return http.delete(getMovieUrl(movieId));
}

export function getMovie(movieId) {
  return http.get(getMovieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = {...movie};
    delete body._id;

    return http.put(getMovieUrl(movie._id), body);
  }
  return http.post(config.apiUrl + '/movies', movie);
}
