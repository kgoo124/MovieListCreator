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

  // raw data from http request
  movieData: any;

  // URL for the .NET API
  rootURL = "";

  // functions
  async ngOnInit() {
    this.rootURL = window.location.href + "api/Movies";
    this.getMovies();
    // console.log(this.data);
  }

  // Server-Side Movie List Functions

  // returns the data from the API call to the database
  async getMovies() {
    this.http.get(this.rootURL).subscribe(
      res => {
        // sql query ORDER BY genre
        this.movieData = res;

        // TO-DO: break off into a function later
        let genre = "";
        let movies = [];
        for (let movie of this.movieData) {
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
          console.log(movie);
        }
        this.movieLists.push(new MovieList(genre, movies, false, true));
        // END OF FUNCTION
      },
      err => console.log(err)
    );
  }

  // Client-Side Movie List Functions

  // adds a new movie list
  addMovieList() {
    this.movieLists.push(
      new MovieList(
        "",
        [new Movie(0, "Movie1", 0, false), new Movie(0, "Movie2", 2, false)],
        true,
        true
      )
    );
  }
}
