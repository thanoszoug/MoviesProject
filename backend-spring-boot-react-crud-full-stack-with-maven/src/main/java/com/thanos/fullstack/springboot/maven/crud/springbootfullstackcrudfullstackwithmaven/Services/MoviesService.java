package com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Services;

import com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Models.Movie;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MoviesService {
    private static List<Movie> movies = new ArrayList<>();
    private static long idCounter = 0;

    static {
        movies.add(new Movie(++idCounter, "Lord of The ring", "Peter Jackson", 2001, "Great Movie"));
        movies.add(new Movie(++idCounter, "Lord of The ring", "Peter Jackson", 2001, "Great Movie"));
        movies.add(new Movie(++idCounter, "Lord of The ring", "Peter Jackson", 2001, "Great Movie"));
        movies.add(new Movie(++idCounter, "Lord of The ring", "Peter Jackson", 2001, "Great Movie"));
    }

    public List<Movie> findAll() {
        return movies;
    }

    public Movie findById(long id) {
        for (Movie movie: movies) {
            if (movie.getMovieId() == id) {
                return movie;
            }
        }
        return null;
    }

    public Movie deleteById(long id) {
        Movie movie = findById(id);

        if (movie == null)
            return null;

        if (movies.remove(movie)) {
            return movie;
        }

        return null;
    }

    public Movie save(Movie movie) {
        if (movie.getMovieId() == -1 || movie.getMovieId() == 0) {
            movie.setMovieId(++idCounter);
        } else {
            deleteById(movie.getMovieId());
        }
        movies.add(movie);
        return movie;
    }
}
