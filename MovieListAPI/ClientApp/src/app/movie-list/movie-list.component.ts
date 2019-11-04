import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MovieList } from "../movie-list.model";
import { Movie } from "./movie.model";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent {
  constructor(private http: HttpClient) {}
  @Input() movieLists: Array<MovieList>;
  @Input() movieList: MovieList;
  @Input() i: number;
  @Input() rootUrl: string;
  @Input() genres: Array<string>;

  // // URL for the .NET API
  // readonly rootURL = "https://localhost:44350/api/Movies";

  // Error Message for the same genre
  errorMsg: string;

  oldGenre: string;

  // Omdb API variables
  moviesFound = false; // true if the omdb api finds any matching movies
  titles: []; // an array of the movie titles returned by the omdb api

  // deletes a movie list
  deleteMovieList(i) {
    this.movieLists.splice(i, 1);
  }

  // switches to an input box to rename the genre
  changeToMovieListInput(movieList) {
    movieList.genreClicked = !movieList.genreClicked;
    this.oldGenre = movieList.genre;
    movieList.genre = "";
  }

  // renames the genre based on the input box value
  renameGenre(movieList) {
    let genre = this.wordFormatting(movieList.genre);
    if (movieList.genre == "") {
      movieList.genre = "Forgot Genre?";
      movieList.genreClicked = !movieList.genreClicked;
    } else if (this.genres.indexOf(genre) > -1 && genre != this.oldGenre) {
      this.errorMsg = "This genre is already being used, please rename it";
    } else {
      this.errorMsg = "";
      let i = this.genres.indexOf(this.oldGenre);
      if (i != -1) {
        this.genres.splice(i, 1);
      }
      this.oldGenre = "";
      this.genres.push(genre);
      movieList.genre = genre;
      movieList.genreClicked = !movieList.genreClicked;
    }
    console.log(this.genres);
  }

  // Movie Functions
  addMovie(i) {
    this.resetOmdbVariables();
    let movie = new Movie(0, "", 0, true);
    // add to the db
    this.http.post(this.rootUrl, movie).subscribe(
      res => {
        console.log("Res: " + res);
      },
      err => console.log(err)
    );
    // add to the client
    this.movieLists[i].movies.push(movie);
  }

  deleteMovie(i, j) {
    this.movieLists[i].movies.splice(j, 1);
  }

  // changes the genre to an input box
  changeToMovieInput(movie) {
    movie.movieClicked = !movie.movieClicked;
    movie.title = "";
    this.resetOmdbVariables();
  }

  // looks through the API to find potential movie titles
  ombdAPI(title) {
    let apiLink = `https://www.omdbapi.com/?s=${title}&apikey=9e7984e`;
    if (title.length > 2) {
      this.http.get(apiLink).subscribe(
        res => {
          if (res["Response"] == "True") {
            this.titles = res["Search"].map(movie => {
              return movie["Title"];
            });
            this.moviesFound = true;
          } else {
            this.resetOmdbVariables();
          }
        },
        err => console.log(err)
      );
    }
  }

  // resets the titles array and moviesFound flag
  resetOmdbVariables() {
    this.titles = [];
    this.moviesFound = false;
  }

  // renames movie based on the input box or the dropdown menu
  renameMovie(movie, title) {
    if (movie.movieClicked == true) {
      if (title == "") {
        movie.title = "Forgot Title?";
      } else {
        movie.title = this.wordFormatting(title);
      }
      movie.movieClicked = !movie.movieClicked;
    }
  }

  print(rating) {
    console.log(rating);
  }

  // capitalizes the first letter of every word
  wordFormatting(word) {
    return word
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  }
}
