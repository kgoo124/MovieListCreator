import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { StarRatingComponent } from "./star-rating/star-rating.component";

@NgModule({
  declarations: [AppComponent, MovieListComponent, StarRatingComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
