import React from "react";
import MovieService from "../../services/movie-service";
import Loader from "../UI/Loader/Loader";
import ErrorIndicator from "../UI/ErrorIndicator/ErrorIndicator";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css"

export default class MovieCardList extends React.Component {
movieService = new MovieService();

state = {
   movies: [],
   loading: true,
   error: false
}

constructor() {
    super();
    this.searchMovies();
}

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    searchMovies = () => {
        this.movieService.getMovies()
            .then(({results}) => {
            this.setState({
                movies: results.map((result) => ({
                    id: result.id,
                    title: result.title,
                    date: result.release_date,
                    genre: result.genre_ids,
                    description: result.overview,
                    img: `https://image.tmdb.org/t/p/original${result.poster_path}`,
                })),
                loading: false
            });
        })
            .catch(this.onError);
    }


    render() {

    const {movies, loading, error} = this.state;
        if (error) {
            return <ErrorIndicator />;
        }

        if (loading) {
            return <Loader />;
        }

    const foundMovies = movies.map((movie) => {
        const {id, ...movieData} = movie;
        return (

            <li key={id} className="movieCard">

                <MovieCard
                    {...movieData}
                />
            </li>


        )
    })

            return <ul className="moviesList">{foundMovies}</ul>




    }
}