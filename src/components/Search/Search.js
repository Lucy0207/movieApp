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


    constructor(props) {
        super(props);
        this.fetchMoviesDebounced = debounce(this.fetchMovies, 500); // Debounce time of 300 milliseconds
    }

    /*handleChange = async (e) => {
        const value = e.target.value;
        this.setState({ value });

        try {
            const movieService = new MovieService();
            this.setState({ loading: true });
            const movies = await movieService.getMovies(value);
            this.setState({
                movies: movies.results,
                loading: false,
                error: false
            });
        } catch (error) {
            console.error("Error fetching movies:", error);
            this.setState({
                error: true,
                loading: false
            });
        }
    }*/

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ value });
        this.fetchMoviesDebounced(value);
    };

    fetchMovies = async (query, page) => {
        try {
            const movieService = new MovieService();
            this.setState({ loading: true });
            const movies = await movieService.getMovies(query, page);
            const {results, total_pages} = movies;
            this.setState({
                movies: results,
                loading: false,
                error: false,
                totalPages: total_pages,
                currentPage: page
            });
        } catch (error) {
            console.error("Error fetching movies:", error);
            this.setState({
                error: true,
                loading: false,
            });
        }
    };

    handlePageChange = (page) => {
        const { value } = this.state;
        this.fetchMovies(value, page);
    };


    render() {
        const {value, movies, loading, error, totalPages, currentPage} = this.state;
        return (

            <>
                <form>
                    <input
                        type="text"
                        placeholder="Type to search..."
                        value={value}
                        onChange={this.handleChange}
                        autoFocus
                    />
                </form>
                {loading && <Loader />}
                {error && <ErrorIndicator />}
                <MovieCardList movies={movies} />
                <MoviesPagination
                current={currentPage}
                total={totalPages}
                onChange={this.handlePageChange}/>
            </>
        )
    }
}