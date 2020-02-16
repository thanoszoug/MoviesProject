package com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Controllers;

import com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Models.Movie;
import com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Services.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
public class MoviesCrontroller {

        @Autowired
        private MoviesService moviesService;

        @GetMapping("/movies")
        public List<Movie> getAllMovies() {
            return moviesService.findAll();
        }

        @GetMapping("/movies/{id}")
        public Movie getMovie(@PathVariable long id) {
                return moviesService.findById(id);
        }

        @PutMapping("/movies/{id}")
        public ResponseEntity<Movie> updateMovie(@PathVariable long id, @RequestBody Movie movie) {
                if(movie.getMovieTitle().equals("") || movie.getMovieTitle() == null || movie.getYear() == null || movie.getDirector().equals("") || movie.getDirector() == null){
                        return ResponseEntity.badRequest().build();
                }
                
                Movie movieUpdated = moviesService.save(movie);
                return new ResponseEntity<Movie>(movieUpdated, HttpStatus.OK);
        }

        @PostMapping("/movies")
        public ResponseEntity<Void> createMovie(@RequestBody Movie movie) throws HttpClientErrorException.BadRequest {
                if(movie.getMovieTitle().equals("") || movie.getMovieTitle() == null || movie.getYear() == null || movie.getDirector().equals("") || movie.getDirector() == null){
                        return ResponseEntity.badRequest().build();
                }

                Movie createdCourse = moviesService.save(movie);
                URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(createdCourse.getMovieId())
                        .toUri();

                return ResponseEntity.created(uri).build();
        }

        @DeleteMapping("/movies/{id}")
        public ResponseEntity<Void> deleteMovie(@PathVariable long id) {
                Movie movie = moviesService.deleteById(id);

                if (movie != null) {
                        return ResponseEntity.noContent().build();
                }

                return ResponseEntity.notFound().build();
        }


}
