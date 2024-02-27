import React from "react";

import "./app.css";
import Pages from "../Pages/Pages";
import MovieService from "../../services/movie-service";

export default class App extends React.Component {

    state = {
        guestSessionId: ""
    }

    componentDidMount() {
        this.gettingSessionId();

    }

    gettingSessionId = async () => {
        const movieService = new MovieService();
        const guestSession = await movieService.createGuestSession();
        const {guest_session_id} = guestSession;

        this.setState({
            guestSessionId: guest_session_id
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




    render() {
        const {guestSessionId} = this.state;

        return (
            <div className="movieApp">
                <Pages guestSessionId={guestSessionId} onMovieRate={this.postingMovieRating}  />
            </div>
        )
    }
}