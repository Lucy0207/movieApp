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
            await this.fetchMovies(this.state.currentPage);
        } catch (error) {
            console.error("Error mounting Rated component:", error);
            this.handleError();
        }
    }

    handleError = () => {
        this.setState({
            error: true,
        });
    };


    fetchMovies = async (page) => {
        try {
            const {guestSessionId, onMapMovies} = this.props;
            this.setState({ loading: true });
            const movieService = new MovieService();
            const movies = await movieService.getRatedMovies(guestSessionId, page);
            const mappedMovies = onMapMovies(movies.results);
            this.setState({
                movies: mappedMovies,
                totalPages: movies.total_pages,
                currentPage: page,
                loading: false,
                error: false
            });
        } catch (error) {
            console.error("Error fetching movies:", error);
            this.handleError();
        } finally {
            this.setState({ loading: false });
        }
    };

    handlePageChange = (page) => {
        this.fetchMovies(page);
    };




    render() {
        const { movies, loading, error, totalPages, currentPage } = this.state;


        if (error) {
            return <ErrorIndicator />;
        }


        if (loading) {
            return <Loader />;
        }


        if (!movies || movies.length === 0) {
            return <ErrorIndicator description="There are no rated movies"/>;
        }
        return (
            <>

                <MovieCardList movies={this.state.movies} />
                <MoviesPagination
                    current={currentPage}
                    total={totalPages}
                    onChange={this.handlePageChange}
                    />
            </>
        );
    }
}