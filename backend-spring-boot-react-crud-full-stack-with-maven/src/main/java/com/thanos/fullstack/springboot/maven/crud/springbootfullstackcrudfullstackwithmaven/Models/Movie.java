package com.thanos.fullstack.springboot.maven.crud.springbootfullstackcrudfullstackwithmaven.Models;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.Year;
import java.util.Date;

public class Movie {
    private Long MovieId;
    private String MovieTitle;
    private String Director;
    private Date Year;
    private String Description;

    public Movie() {
    }

    public Long getMovieId() {
        return MovieId;
    }

    public Movie(Long movieId, String movieTitle, String director, Date year, String description) {
        MovieId = movieId;
        MovieTitle = movieTitle;
        Director = director;
        Year = year;
        Description = description;
    }

    public void setMovieId(Long movieId) {
        MovieId = movieId;
    }

    public String getMovieTitle() {
        return MovieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        MovieTitle = movieTitle;
    }

    public String getDirector() {
        return Director;
    }

    public void setDirector(String director) {
        Director = director;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    public Date getYear() {
        return Year;
    }
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    public void setYear(Date year) {
        Year = year;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}
