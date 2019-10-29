import { Movie } from "./movie-list/movie.model";

export class MovieList {
    genre: String;
    movies: Array<Movie>;
    genreClicked: boolean;
    collapsed: boolean;
    constructor(genre, movies, genreClicked, collapsed) {
        this.genre = genre;
        this.movies = movies;
        this.genreClicked = genreClicked;
        this.collapsed = collapsed;
    }
}
