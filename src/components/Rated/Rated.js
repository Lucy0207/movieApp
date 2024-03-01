import React from "react";
import "./Rated.css";
import MovieCardList from "../MovieCardList/MovieCardList";
import MoviesPagination from "../UI/Pagination/MoviesPagination";
import MovieService from "../../services/movie-service";
import Loader from "../UI/Loader/Loader";
import ErrorIndicator from "../UI/ErrorIndicator/ErrorIndicator";

export default class Rated extends React.Component {
    state = {
        value: "",
        movies: [],
        loading: false,
        error: false,
        currentPage: 1,
        totalPages: 1
    }

    async componentDidMount() {
        try {
            await this.fetchMovies();
        } catch (error) {
            console.error("Error mounting Rated component:", error);
        }
    }



    fetchMovies = async () => {
        try {
            const {guestSessionId, onMapMovies} = this.props;
            this.setState({ loading: true });
            const movieService = new MovieService();
            const movies = await movieService.getRatedMovies(guestSessionId);
            const mappedMovies = onMapMovies(movies.results);
            this.setState({
                movies: mappedMovies,
                totalPages: movies.total_pages
            });
        } catch (error) {
            console.error("Error fetching movies:", error);
            this.handleError();
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { movies, loading, error } = this.state;


        if (error) {
            return <ErrorIndicator />;
        }


        if (loading) {
            return <Loader />;
        }


        if (!movies || movies.length === 0) {
            return <div>No rated movies available.</div>;
        }
        return (
            <>

                <MovieCardList movies={this.state.movies} />
                <MoviesPagination />
            </>
        );
    }
}