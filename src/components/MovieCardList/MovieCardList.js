import React from 'react';
import MovieService from '../../services/movie-service';
import Loader from '../UI/Loader/Loader';
import ErrorIndicator from '../UI/ErrorIndicator/ErrorIndicator';

import MovieCard from '../MovieCard/MovieCard';
import './MovieCardList.css';

export default class MovieCardList extends React.Component {
  render() {
    const { movies, loading, error } = this.props;
    const { guestSessionId, onMovieRate } = this.props;
    if (error) {
      return <ErrorIndicator />;
    }

    if (loading) {
      return <Loader />;
    }

    const foundMovies = movies.map((movie) => {
      const { id, ...movieData } = movie;

      return (
        <li key={id} className="movieCard">
          <MovieCard movieId={id} {...movieData} guestSessionId={guestSessionId} onMovieRate={onMovieRate} />
        </li>
      );
    });

    return <ul className="moviesList">{foundMovies}</ul>;
  }
}
