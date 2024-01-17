
class MovieService {
    async getResource(url) {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGNlNjc4NDM1M2FlZTdmZDUyNzc3Y2UwYzM2Y2EyZCIsInN1YiI6IjY1YTEyNWYzZjA0ZDAxMDEyYjc5MTdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCXPpqOfS1VM5CvxNkYyiQ5cFIFIwl3u9EHJwe80S_k',
                'accept': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}. Received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }
    async getAllMovies() {
        const res = await this.getResource('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        return res.results;
    }

}

const movieApp = new MovieService();
movieApp.getAllMovies().then((body) => console.log(body))