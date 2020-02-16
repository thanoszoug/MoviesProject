import axios from 'axios'

const COURSE_API_URL = 'http://localhost:8080'
const API_URL = `${COURSE_API_URL}`

class MoviesDataService {

    retrieveAllMovies() {
        return axios.get(`${API_URL}/movies`);
    }

    retrieveMovie(id) {
        return axios.get(`${API_URL}/movies/${id}`);
    }

    updateMovie(id, course) {
        return axios.put(`${API_URL}/movies/${id}`, course);
    }
  
    createMovie(course) {
        return axios.post(`${API_URL}/movies/`, course);
    }

    deleteMovie(id) {
        return axios.delete(`${API_URL}/movies/${id}`);
    }
}

export default new MoviesDataService()