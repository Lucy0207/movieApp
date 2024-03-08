import React from 'react';
import Search from '../Search/Search';
import Rated from '../Rated/Rated.js';
import NavBar from '../NavBar/NavBar';

import './Pages.css';

export default class Pages extends React.Component {
  render() {
    const { guestSessionId, onMovieRate, onMapMovies, onGetRatedMovies } = this.props;
    return (
      <>
        <NavBar
          className="navigation"
          guestSessionId={guestSessionId}
          onMovieRate={onMovieRate}
          onMapMovies={onMapMovies}
          onGetRatedMovies={onGetRatedMovies}
        />
      </>
    );
  }
}
