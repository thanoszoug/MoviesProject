import React, { Component } from 'react';
import MoviesDataService from '../Services/MoviesDataService';
import "../style.css";

class ListMoviesComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            filtered: [],
            movies: [],
            message: null,
            selectedDesc: '',
            selectedTitle: '',
            selectedDirector: '',
            selectedYear: 0,
            selectedId: 0

        }
        this.refreshMovies = this.refreshMovies.bind(this)
        this.deleteMovieClicked = this.deleteMovieClicked.bind(this)
        this.updateMovieClicked = this.updateMovieClicked.bind(this)
        this.addMovieClicked = this.addMovieClicked.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.refreshMovies();
        this.setState({
            filtered: this.props.items
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
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

    getMovieData(id) {
        MoviesDataService.retrieveMovie(id)
            .then(response =>
                this.setState(
                    {
                        selectedId: response.data.movieId,
                        selectedDesc: response.data.description,
                        selectedTitle: response.data.movieTitle,
                        selectedDirector: response.data.director,
                        selectedYear: response.data.year
                    }
                )
            )
    }

    updateMovieClicked(id) {
        this.props.history.push(`/movies/${id}`)
    }

    addMovieClicked() {
        this.props.history.push(`/movies/-1`)
    }

    handleChange(e) {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.state.movies;

            newList = currentList.filter(item => {
                const lc = item.movieTitle.toString().toLowerCase();
                const filter = e.target.value.toString().toLowerCase();
                return lc.includes(filter);
            });
        } else {
            this.refreshMovies();
        }
        this.setState({
            movies: newList
        });
    }

    render() {
        let { selectedId, selectedTitle, selectedDirector, selectedYear, selectedDesc } = this.state

        return (
            <div>

                <div class="wrap">
                    <div class="search">
                        <button style={{ float: "left", width: "15%" }} className="btn add-button" onClick={this.addMovieClicked}>Add Movie</button>
                        <input type="text" class="searchTerm" placeholder="What are you looking for?" onChange={this.handleChange} />
                    </div>
                </div>
                <div style={{ float: "left", width: "50%" }} className="container">
                    {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Director</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.movies.map(
                                        movie =>
                                            <tr key={movie.movieId} onClick={() => this.getMovieData(movie.movieId)}>
                                                <td>{movie.movieId}</td>
                                                <td>{movie.movieTitle}</td>
                                                <td>{movie.director}</td>
                                                <td>{movie.year}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="vl"></div>
                {
                    this.state.selectedId !== 0 ?

                        <div style={{ float: "right", width: "50%" }} className="container">
                            <h1>{this.state.selectedTitle}</h1>
                            <h5>Directed by: {this.state.selectedDirector}</h5>
                            <p>{this.state.selectedDesc}</p>
                            <button className="btn add-button" onClick={() => this.updateMovieClicked(selectedId)}>Update</button>
                            <button className="btn add-button" onClick={() => this.deleteMovieClicked(selectedId)}>Delete</button>
                        </div>
                        :
                        <div style={{ float: "right", width: "50%" }} className="container">
                            No Movie Selected
                        </div>
                }
            </div>
        )
    }
}

export default ListMoviesComponent