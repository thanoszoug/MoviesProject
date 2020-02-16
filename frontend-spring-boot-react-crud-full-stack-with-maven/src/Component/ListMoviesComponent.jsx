import React, { Component } from 'react';
import MoviesDataService from '../Services/MoviesDataService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
                <div className="row">
                    <button style={{ float: "left", width: "15%" }} className="btn btn-success" onClick={this.addMovieClicked}>Add Movie</button>
                    <input style={{ float: "right", width: "85%" }} type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
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
                                    <th>Description</th>
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
                                                <td>{movie.description}</td>
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
                            <Formik
                                initialValues={{ selectedId, selectedTitle, selectedDirector, selectedYear, selectedDesc }}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <fieldset className="form-group">
                                                <label>Id</label>
                                                <Field className="form-control" type="text" name="selectedId" disabled />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Movie Title</label>
                                                <Field className="form-control" type="text" name="selectedTitle" disabled />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Director</label>
                                                <Field className="form-control" type="text" name="selectedDirector" disabled />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Year</label>
                                                <Field className="form-control" type="text" name="selectedYear" disabled />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Description</label>
                                                <Field className="form-control" type="text" name="selectedDesc" disabled />
                                            </fieldset>
                                            <button className="btn btn-success" onClick={() => this.updateMovieClicked(selectedId)}>Update</button>
                                            <button className="btn btn-warning" onClick={() => this.deleteMovieClicked(selectedId)}>Delete</button>
                                        </Form>
                                    )
                                }
                            </Formik>
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