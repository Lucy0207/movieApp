import React from "react";
import MovieService from "../../services/movie-service";
import Loader from "../UI/Loader/Loader";
import ErrorIndicator from "../UI/ErrorIndicator/ErrorIndicator";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css"

export default class MovieCardList extends React.Component {


state = {
   loading: true,
   error: false
}

componentDidMount() {
    this.searchMovies()
}

componentDidUpdate(prevProps) {
        if (prevProps.movies !== this.props.movies) {
            this.searchMovies();
        }
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    searchMovies = () => {
        const { movies } = this.props;
        try {
            const mappedMovies = movies.map((result) => ({
                id: result.id,
                title: result.title,
                date: result.release_date,
                genre: result.genre_ids,
                description: result.overview,
                rating: result.vote_average,
                "poster_path": result.poster_path,
            }));
            this.setState({
                movies: mappedMovies,
                loading: false
            });
        } catch (error) {
            console.error("Error mapping movies:", error);
            this.onError(error);
        }
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