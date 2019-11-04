import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MovieList } from "./movie-list.model";
import { Movie } from "./movie-list/movie.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  // variables
  title = "movie-lists";
  movieLists = [];
  genres = [];

  // raw data from http request
  movieData: any;

  // URL for the .NET API
  rootUrl = window.location.href + "api/Movies";

  // functions
  async ngOnInit() {
    this.getMovies();
  }

  // Server-Side Movie List Functions

  // returns the data from the API call to the database
  async getMovies() {
    this.http.get(this.rootUrl).subscribe(
      res => {
        // sql query ORDER BY genre
        this.processMovieData(res);
      },
      err => console.log(err)
    );
  }

  // process movie data
  processMovieData(movieData) {
    let genre = "";
    let movies = [];
    for (let movie of movieData) {
      // if this is first movie, set the genre to that genre
      if (genre == "") {
        genre = movie.genre;
      }
      // if genre doesn't match, create a new movielist
      else if (genre != movie.genre) {
        this.movieLists.push(new MovieList(genre, movies, false, true));
        genre = movie.genre;
        movies = [];
      }
      movies.push(new Movie(movie.id, movie.title, movie.rating, false));
    }
    this.movieLists.push(new MovieList(genre, movies, false, true));
  }

  // Client-Side Movie List Functions

  // adds a new movie list
  addMovieList() {
    this.movieLists.push(
      new MovieList("", [new Movie(0, "Movie1", 0, false)], true, true)
    );
  }
}
