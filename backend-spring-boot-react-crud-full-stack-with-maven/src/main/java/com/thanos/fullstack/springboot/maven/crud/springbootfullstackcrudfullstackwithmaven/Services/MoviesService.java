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
            movies.add(new Movie(++idCounter, "The Lord of the Rings: The Fellowship of the Ring", "Peter Jackson", new SimpleDateFormat("dd/MM/yyyy").parse("10/12/2001"), "Set in Middle-earth, the story tells of the Dark Lord Sauron, who is seeking the One Ring. The Ring has found its way to the young hobbit Frodo Baggins. The fate of Middle-earth hangs in the balance as Frodo and eight companions who form the Fellowship of the Ring begin their journey to Mount Doom in the land of Mordor, the only place where the Ring can be destroyed."));
            movies.add(new Movie(++idCounter, "The Lord of the Rings: The Two Towers", "Peter Jackson", new SimpleDateFormat("dd/MM/yyyy").parse("05/12/2002"), "Continuing the plot of The Fellowship of the Ring, the film intercuts three storylines. Frodo and Sam continue their journey towards Mordor to destroy the One Ring, meeting and joined by Gollum, the ring's former owner. Aragorn, Legolas, and Gimli come to the war-torn nation of Rohan and are reunited with the resurrected Gandalf, before fighting at the Battle of Helm's Deep. Merry and Pippin escape capture, meet Treebeard the Ent, and help to plan an attack on Isengard."));
            movies.add(new Movie(++idCounter, "The Lord of the Rings: The Return of the King", "Peter Jackson", new SimpleDateFormat("dd/MM/yyyy").parse("01/12/2003"), "Continuing the plot of The Two Towers, Frodo, Sam and Gollum are making their final way toward Mount Doom in Mordor in order to destroy the One Ring, unaware of Gollum's true intentions, while Gandalf, Aragorn, Legolas, Gimli and the rest are joining forces together against Sauron and his legions in Minas Tirith."));
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
