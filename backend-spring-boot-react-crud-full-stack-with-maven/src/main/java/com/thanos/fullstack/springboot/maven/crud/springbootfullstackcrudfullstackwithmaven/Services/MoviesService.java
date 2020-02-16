package com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Services;

import com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Models.Movie;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MoviesService {
    private static List<Movie> movies = new ArrayList<>();
    private static long idCounter = 0;

    static {
        try {
            movies.add(new Movie(++idCounter, "The Lord of the Rings: The Fellowship of the Ring", "Peter Jackson", new SimpleDateFormat("dd/MM/yyyy").parse("10/12/2001"), "Great Movie"));
            movies.add(new Movie(++idCounter, "The Lord of the Rings: The Two Towers", "Peter Jackson", new SimpleDateFormat("dd/MM/yyyy").parse("05/12/2002"), "Great Movie"));
            movies.add(new Movie(++idCounter, "The Lord of the Rings: The Return of the King", "Peter Jackson", new SimpleDateFormat("dd/MM/yyyy").parse("01/12/2003"), "Great Movie"));
        } catch (Exception ex){
            ex.printStackTrace();
        }
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
