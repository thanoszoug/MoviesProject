import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MoviesDataService from '../Services/MoviesDataService';

class MovieComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            movieId: this.props.match.params.id,
            movieTitle: '',
            director: '',
            year: '',
            description: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.movieId == -1) {
            return
        }
        this.getMovieData(this.state.movieId)
    }

    getMovieData(id) {
        MoviesDataService.retrieveMovie(id)
            .then(response =>
                this.setState(
                    {
                        description: response.data.description,
                        movieTitle: response.data.movieTitle,
                        director: response.data.director,
                        year: response.data.year
                    }
                )
            )
    }

    onSubmit(values) {
        let movie = {
            movieId: values.movieId,
            description: values.description,
            movieTitle: values.movieTitle,
            director: values.director,
            year: values.year
        }

        if (this.state.id === -1) {
            MoviesDataService.createMovie(movie)
                .then(() => this.props.history.push('/movies'))
        } else {
            MoviesDataService.updateMovie(this.state.movieId, movie)
                .then(() => this.props.history.push('/movies'))
        }
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        return errors
    }

    render() {
        let { movieId, movieTitle, director, year, description } = this.state

        return (
            <div>
                <h3>Movie</h3>
                <div className="container">
                    <Formik
                        initialValues={{ movieId, movieTitle, director, year, description }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />

                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="movieId" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Movie Title</label>
                                        <Field className="form-control" type="text" name="movieTitle" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Director</label>
                                        <Field className="form-control" type="text" name="director" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Year</label>
                                        <Field className="form-control" type="date" name="year" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

export default MovieComponent