import React from "react";

import "./app.css";
import Pages from "../Pages/Pages";
import MovieService from "../../services/movie-service";
import NavBar from "../NavBar/NavBar";
import {GenreProvider} from "../GenresContext/GenresContext";

export default class App extends React.Component {

    state = {
        guestSessionId: "",
        pageTab: "1",
        genres: []

    }

    componentDidMount() {
        this.gettingSessionId();
        this.getMovieGenres();

    }

    gettingSessionId = async () => {
        const movieService = new MovieService();
        const guestSession = await movieService.createGuestSession();
        const {guest_session_id} = guestSession;

        this.setState({
            guestSessionId: guest_session_id
        })


    }

    getMovieGenres = async () => {
        const movieService = new MovieService();
        const genres = await movieService.getGenres();

        this.setState({
            genres: genres.genres
        })

    }

    postingMovieRating = async (movieId, rating) => {

        try {
            const { guestSessionId } = this.state;

            const movieService = new MovieService();
            await movieService.rateMovies(guestSessionId, movieId, rating);
            console.log("Movie rated successfully.");
        } catch (error) {
            console.error("Error rating movie:", error);

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
                rated: result.rating

            }));
            return mappedMovies;
        } catch (error) {
            console.error("Error mapping movies:", error);
            // this.handleError();
            return [];
        }
    };


  gettingRatedMovies = async () => {
        try {
            const {guestSessionId} = this.state;
            const movieService = new MovieService();
            await movieService.getRatedMovies(guestSessionId);
        } catch (error) {
            console.error("Error retrieving rated movies: ", error)
        }
    }

    handlePageTabChange = (key) => {
        this.setState({
            pageTab: key,
        });
    };


    render() {
        const {guestSessionId, pageTab, genres} = this.state;

        return (
            <GenreProvider value={genres} >
            <div className="movieApp">
                <NavBar className="navigation"
                        guestSessionId={guestSessionId}
                        onMovieRate={this.postingMovieRating}
                        onMapMovies={this.mapMovies}
                        onGetRatedMovies={this.gettingRatedMovies}
                        pageTab={pageTab}
                        onPageTabChange={this.handlePageTabChange}

                />

            </div>
            </GenreProvider>
        )
    }
}