import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const API_KEY = "10ce6784353aee7fd52777ce0c36ca2d";

export const moviesApi = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    },
    params: {
        api_key: API_KEY
    }
})
export default class MovieService {
    async getMovies() {
        const res = await moviesApi.get(`${baseURL}/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`);
        return res.data;
    }

}

/*
const movies = new MovieService();
movies.getMovies()
.then((movie) => console.log(movie));*/
