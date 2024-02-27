import React from "react";
import { format } from "date-fns";
import icon from "./no_image.png";
import Rating from "../UI/Rating/Rating";

import "./MovieCard.css";

export default class MovieCard extends React.Component {

   textCut = (text, limit) => {
        text = text.trim();
        if (text.length <= limit) return text;
        text = text.slice(0, limit);
        let lastSpace = text.lastIndexOf(" ");
        if(lastSpace > 0) {
            text = text.substring(0, lastSpace);
        }
        return text + "...";
    }

    handleRatingChange = (rating) => {
        const { movieId, onMovieRate } = this.props;
        onMovieRate(movieId, rating);
    };;


    render() {
        const {title, date, genre, description, rating, poster_path, guestSessionId, movieId} = this.props;
        const formattedDate = date ? format(new Date(date), 'MMMM dd, yyyy') : "Unknown release date";

        return (
           <>
             <img
                src={
                 poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : icon
                }
                className="movieCard-image image"
                alt={title}
                />

             <div className="movieCard--body">
                    <h2 className="movieCard--title">{title}</h2>
                    <div className="movieCard--average-rating">
                        <span className="movieCard--average-rating__text">{rating.toFixed(1)}</span>
                    </div>
                    <div>{formattedDate}</div>

                    <div>drama</div>
                    <div><span className="movieCard--description">{this.textCut(description, 150)}</span></div>
                    <Rating onRateChange={this.handleRatingChange} guestSessionId={guestSessionId} movieId={movieId}/>
                </div>
           </>

        )
    }


}