/*Movie Class
@param: title: String               The title of the movie
@param: rating: Number              The rating of the movie
@param: movieClicked: boolean       Determines whether the movie was clicked or not (used for renaming movies)
*/
export class Movie {
  id: Number;
  title: String;
  rating: Number;
  movieClicked: boolean;
  constructor(id, title, rating, movieClicked) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.movieClicked = movieClicked;
  }
}
