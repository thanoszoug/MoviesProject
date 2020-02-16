import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route  } from "react-router-dom";
import ListMoviesComponent from './ListMoviesComponent';
import MovieComponent from './MovieComponent';

class MoviesApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Movies Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListMoviesComponent} />
                        <Route path="/movies" exact component={ListMoviesComponent} />
                        <Route path="/movies/:id" component={MovieComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default MoviesApp