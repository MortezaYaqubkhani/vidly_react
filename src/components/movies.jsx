import React, {Component} from 'react';
import * as movieAPI from '../fakeMovieService';

class Movies extends Component {
  state = {
    movies: movieAPI.getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({movies});
  };

  render() {
    const {length: count} = this.state.movies;
    if (count === 0) return <p>There are no movies into the database ...</p>;
    else
      return (
        <React.Fragment>
          <p>showing {count} movies in the database ...</p>
          <table className="table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
  }
}

export default Movies;