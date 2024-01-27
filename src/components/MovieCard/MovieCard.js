import React from "react";
import { format } from "date-fns";
import icon from "./no_image.png";

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


    render() {
        const {title, date, genre, description, poster_path} = this.props;
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
                    <div>{formattedDate}</div>
                    <div>drama</div>
                    <div>{this.textCut(description, 150)}</div>
                </div>
           </>

        )
    }


}