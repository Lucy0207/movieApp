import React from 'react';

import './app.css';
import MovieService from '../../services/movie-service';
import NavBar from '../NavBar/NavBar';
import { GenreProvider } from '../GenresContext/GenresContext';
import ErrorIndicator from '../UI/ErrorIndicator/ErrorIndicator';

export default class App extends React.Component {
  state = {
    guestSessionId: '',
    pageTab: 'Search',
    genres: [],
    isOnline: navigator.onLine,
  };

  componentDidMount() {
    this.gettingSessionId();
    this.getMovieGenres();
    window.addEventListener('online', this.handleOnlineStatus);
    window.addEventListener('offline', this.handleOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnlineStatus);
    window.removeEventListener('offline', this.handleOnlineStatus);
  }

  handleOnlineStatus = () => {
    this.setState({ isOnline: navigator.onLine });
  };

  gettingSessionId = async () => {
    const movieService = new MovieService();
    const guestSession = await movieService.createGuestSession();
    const { guest_session_id } = guestSession;

    this.setState({
      guestSessionId: guest_session_id,
    });
  };

  getMovieGenres = async () => {
    const movieService = new MovieService();
    const genres = await movieService.getGenres();

    this.setState({
      genres: genres.genres,
    });
  };

  postingMovieRating = async (movieId, rating) => {
    try {
      const { guestSessionId } = this.state;

      const movieService = new MovieService();
      await movieService.rateMovies(guestSessionId, movieId, rating);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  mapMovies = (movies) => {
    try {
      const mappedMovies = movies.map((result) => ({
        id: result.id,
        title: result.title,
        date: result.release_date,
        genre: result.genre_ids,
        description: result.overview,
        rating: result.vote_average,
        poster_path: result.poster_path,
        rated: result.rating,
      }));
      return mappedMovies;
    } catch (error) {
      console.error('Error mapping movies:', error);
      return [];
    }
  };

  gettingRatedMovies = async () => {
    try {
      const { guestSessionId } = this.state;
      const movieService = new MovieService();
      await movieService.getRatedMovies(guestSessionId);
    } catch (error) {
      console.error('Error retrieving rated movies: ', error);
    }
  };

  handlePageTabChange = (key) => {
    this.setState({
      pageTab: key,
    });
  };

  render() {
    const { guestSessionId, pageTab, genres, isOnline } = this.state;

    return (
      <GenreProvider value={genres}>
        <div className="movieApp">
          {!isOnline && <ErrorIndicator description="You are offline. Please check your Internet connection" />}
          <NavBar
            className="navigation"
            guestSessionId={guestSessionId}
            onMovieRate={this.postingMovieRating}
            onMapMovies={this.mapMovies}
            onGetRatedMovies={this.gettingRatedMovies}
            pageTab={pageTab}
            onPageTabChange={this.handlePageTabChange}
          />
        </div>
      </GenreProvider>
    );
  }
}
