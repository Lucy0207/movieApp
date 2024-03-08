import React from 'react';

import { GenreConsumer } from '../GenresContext/GenresContext';

import './Genres.css';

export default class Genres extends React.Component {
  render() {
    const { genresArray } = this.props;
    return (
      <GenreConsumer>
        {(genres) => {
          let genreNames = genresArray.map((item) => {
            let getItem = genres.find((el) => el.id === item);
            return getItem.name;
          });
          let movieGenres = genreNames.slice(0, 3).map((name, id) => {
            return (
              <span key={id} className="genre">
                {name}
              </span>
            );
          });
          return movieGenres;
        }}
      </GenreConsumer>
    );
  }
}
