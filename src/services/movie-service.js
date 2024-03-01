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
    async getMovies(query, page) {
        const res = await moviesApi.get(`${baseURL}/search/movie`, {
            params: {
                query: query,
                include_adult: false,
                language: "en-US",
                page: page
            }
        });
        return res.data;
    }

    async getGenres() {
        const genres = await moviesApi.get('${baseURL}/genre/movie/list', {
            params: {
                language: "en"
            }
        });
        return genres.data;
    }

    async createGuestSession() {
        const res = await moviesApi.get(`${baseURL}/authentication/guest_session/new`, {
            params: {
                api_key: API_KEY
            }
        });
        return res.data;
    }

    async rateMovies(guestSessionId, movieId, rating) {
        try {
            const res = await moviesApi.post(
                `${baseURL}/movie/${movieId}/rating`,

                {value: rating},
                {
                    params: {
                        api_key: API_KEY,
                        guest_session_id: guestSessionId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return res.data;
        } catch (error) {

            throw error;
        }
    }

    async getRatedMovies(guestSessionId) {
        try {
            const res = await moviesApi.get(`${baseURL}/guest_session/${guestSessionId}/rated/movies`, {
                params: {
                    api_key: API_KEY
                }
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching rated movies:", error);
            throw error;
        }
    }

}




