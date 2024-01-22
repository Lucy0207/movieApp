import React from "react";
import MovieService from "../../services/movie-service";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css"

export default class MovieCardList extends React.Component {
movieService = new MovieService();

state = {
   movies: []
}

constructor() {
    super();
    this.searchMovies();
}

    searchMovies = () => {
        this.movieService.getMovies().then(({results}) => {
            this.setState({
                movies: results.map((result) => ({
                    title: result.title,
                    date: result.release_date,
                    genre: result.genre_ids,
                    description: result.overview,
                    img: `https://image.tmdb.org/t/p/original${result.poster_path}`,
                })),
            });
        });
    }


    render() {
    const {movies} = this.state;
    const foundMovies = movies.map((movie) => {
        const {id, ...movieData} = movie;
        return (
            <li key={id}>
                <MovieCard
                    {...movieData}
                />
            </li>

        )
    })
        return <ul>{foundMovies}</ul>

    }
}