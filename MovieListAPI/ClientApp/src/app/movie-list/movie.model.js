"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*Movie Class
@param: title: String               The title of the movie
@param: rating: Number              The rating of the movie
@param: movieClicked: boolean       Determines whether the movie was clicked or not (used for renaming movies)
*/
var Movie = /** @class */ (function () {
    function Movie(title, rating, movieClicked) {
        this.title = title;
        this.rating = rating;
        this.movieClicked = movieClicked;
    }
    return Movie;
}());
exports.Movie = Movie;
//# sourceMappingURL=movie.js.map