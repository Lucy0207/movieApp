import React from 'react';
import { format } from 'date-fns';

import Rating from '../UI/Rating/Rating';
import Genres from '../Genres/Genres';

import icon from './no_image.png';
import './MovieCard.css';

export default class MovieCard extends React.Component {
  textCut = (text, limit) => {
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    let lastSpace = text.lastIndexOf(' ');
    if (lastSpace > 0) {
      text = text.substring(0, lastSpace);
    }
    return text + '...';
  };

  handleRatingChange = (rating) => {
    const { movieId, onMovieRate } = this.props;
    onMovieRate(movieId, rating);
  };

  render() {
    const { title, date, genre, description, rating, poster_path, guestSessionId, movieId, rated } = this.props;

    const formattedDate = date ? format(new Date(date), 'MMMM dd, yyyy') : 'Unknown release date';
    let classNames = 'movieCard--average-rating';
    if (rating >= 0 && rating <= 3) {
      classNames += ' movieCard--average-rating__red ';
    }
    if (rating > 3 && rating <= 5) {
      classNames += ' movieCard--average-rating__orange ';
    }

    if (rating > 7) {
      classNames += ' movieCard--average-rating__green ';
    }

    let titleNames = 'movieCard--title';
    if (title.length > 40) {
      titleNames += ' movieCard--title__small';
    }

    return (
      <>
        <img
          src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : icon}
          className="movieCard-image image"
          alt={title}
        />

        <div className="movieCard--body">
          <div className="movieCard--header">
            <img
              src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : icon}
              className="image movieCard-image__small"
              alt={title}
            />
            <div className="movieCard--header-content">
              <h2 className={titleNames}>{title}</h2>
              <div className={classNames}>
                <span className="movieCard--average-rating__text">{rating.toFixed(1)}</span>
              </div>
              <div className="movieCard--date">{formattedDate}</div>
              <div>
                <Genres genresArray={genre} />
              </div>
            </div>
          </div>

          <div>
            <span className="movieCard--description">{this.textCut(description, 150)}</span>
          </div>
          <Rating
            onRateChange={this.handleRatingChange}
            guestSessionId={guestSessionId}
            movieId={movieId}
            defaultValue={rated}
          />
        </div>
      </>
    );
  }
}
