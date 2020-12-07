import React, {Component} from 'react';
import {getMovies} from '../services/moviesService';
import {getGenres} from '../services/genreService';
import _ from 'lodash';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import GenreList from './genreList';
import MoviesTable from './moviesTable';
import {Link} from 'react-router-dom';
import SearchBar from './searchBox';
import {deleteMovie} from '../services/moviesService';
import {toast} from 'react-toastify';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: {path: 'title', order: 'asc'},
  };

  async componentDidMount() {
    const {data} = await getGenres();
    const genres = [{_id: '', name: 'All Genres'}, ...data];

    const {data: movies} = await getMovies();
    this.setState({movies, genres});
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({movies});
    //
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted!');

      this.setState({movies: originalMovies});
    }
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
          <Link to={'/movies/new'} className="btn btn-primary m-4">
            New Movie
          </Link>

          <p>showing {totlaCount} movies in the database ...</p>
          <SearchBar data={movies} />
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
