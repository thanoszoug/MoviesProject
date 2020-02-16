import React, { Component } from 'react';
import MoviesDataService from '../Services/MoviesDataService';

class ListMoviesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            message: null
        }
        this.refreshMovies = this.refreshMovies.bind(this)
        this.deleteMovieClicked = this.deleteMovieClicked.bind(this)
        this.updateMovieClicked = this.updateMovieClicked.bind(this)
        this.addMovieClicked = this.addMovieClicked.bind(this)
    }

    componentDidMount() {
        this.refreshMovies();
    }

    refreshMovies() {
        MoviesDataService.retrieveAllMovies()//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ movies: response.data })
                }
            )
    }

    deleteMovieClicked(id) {
        MoviesDataService.deleteMovie(id)
            .then(
                response => {
                    this.setState({ message: `Movie with ${id} Successfully Deleted` })
                    this.refreshMovies()
                }
            )
    }

    updateMovieClicked(id) {
        this.props.history.push(`/movies/${id}`)
    }

    addMovieClicked() {
        this.props.history.push(`/movies/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3>All Movies</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Year</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.movies.map(
                                    movie =>
                                        <tr key={movie.movieId}>
                                            <td>{movie.movieId}</td>
                                            <td>{movie.movieTitle}</td>
                                            <td>{movie.director}</td>
                                            <td>{movie.year}</td>
                                            <td>{movie.description}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteMovieClicked(movie.movieId)}>Delete</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updateMovieClicked(movie.movieId)}>Update</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addMovieClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListMoviesComponent