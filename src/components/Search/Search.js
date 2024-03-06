import React from "react";
import "./Search.css";
import MovieCardList from "../MovieCardList/MovieCardList";
import MoviesPagination from "../UI/Pagination/MoviesPagination";
import MovieService from "../../services/movie-service";
import Loader from "../UI/Loader/Loader";
import ErrorIndicator from "../UI/ErrorIndicator/ErrorIndicator";
import {debounce} from "lodash"



export default class Search extends React.Component {

    state = {
        value: "",
        movies: [],
        loading: false,
        error: false,
        currentPage: 1,
        totalPages: 1
    }


    componentDidMount() {
        this.fetchMoviesDebounced = debounce(this.fetchMovies, 500);
    }

    componentDidUpdate(prevProps, prevState) {
        const { value, currentPage } = this.state;
        if (prevState.value !== value || prevState.currentPage !== currentPage) {
            this.fetchMoviesDebounced(value, currentPage);
        }
    }
    fetchMovies = async (query, page) => {
        try {
            this.setState({ loading: true });
            const movieService = new MovieService();
            const movies = await movieService.getMovies(query, page);
            const mappedMovies = this.props.onMapMovies(movies.results);
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



    handleError = () => {
        this.setState({
            error: true,
        });
    };

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ value });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleNewTodoKeyDown = (e) => {
        e.preventDefault();
        // Access the value from the input field
        const value = this.state.value;
        // Check if the value is not empty
        if (value.trim() !== '') {
            // Fetch movies for the current value and page
            this.fetchMovies(value, this.state.currentPage);
        }
    }

    render() {
        const {value, movies, loading, error, totalPages, currentPage} = this.state;
        const {guestSessionId, onMovieRate} = this.props;
        return (

            <>
                <form onSubmit={this.handleNewTodoKeyDown}>
                    <input
                        type="text"
                        placeholder="Type to search..."
                        value={value}
                        onChange={this.handleChange}
                        autoFocus
                    />
                </form>
                {loading && <Loader />}
                {error && <ErrorIndicator description="There's been a mistake but we trying to fix it. Bear with us" />}
                {!loading && movies.length === 0 && <ErrorIndicator description="We were unable to find a movie with that title. Please try again" />}
                {!loading && movies.length > 0 && (
                    <>
                    <MovieCardList
                        movies={movies}
                        guestSessionId={guestSessionId}
                        onMovieRate={onMovieRate}
                    />
                    <MoviesPagination

                    current={currentPage}
                    total={totalPages}
                    onChange={this.handlePageChange}/>
                    </>
                )}

            </>
        )
    }
}