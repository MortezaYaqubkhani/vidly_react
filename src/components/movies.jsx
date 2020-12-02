import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import _ from 'lodash';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import GenreList from './genreList';
import MoviesTable from './moviesTable';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: {path: 'title', order: 'asc'},
  };

  componentDidMount() {
    const genres = [{_id: '', name: 'All Genres'}, ...getGenres()];
    this.setState({movies: getMovies(), genres});
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({movies});
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  };

  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre, currentPage: 1});
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  getPagedData = () => {
    const {
      pageSize,
      sortColumn,
      currentPage,
      selectedGenre,
      movies: allMovies,
    } = this.state;
    //filtering data
    let filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    //sorting data
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    //paginating data
    const movies = paginate(sortedMovies, currentPage, pageSize);
    //return
    return {totlaCount: filteredMovies.length, data: movies};
  };

  render() {
    //object destructuring
    const {length: count} = this.state.movies;
    const {pageSize, sortColumn, currentPage} = this.state;

    if (count === 0) return <p>There are no movies into the database ...</p>;
    //to get the movies for filtering and pagination
    const {totlaCount, data: movies} = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <GenreList
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>showing {totlaCount} movies in the database ...</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totlaCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
