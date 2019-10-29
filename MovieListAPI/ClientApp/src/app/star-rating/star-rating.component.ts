import { Component, Input } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.css"]
})
export class StarRatingComponent {
  constructor() {}
  @Input() rating;

  title = "Star Rating";
  starList: boolean[] = [true, true, true, true, true]; // create a list which contains status of 5 stars
  //Create a function which receives the value counting of stars click,
  //and according to that value we do change the value of that star in list.

  ngOnInit() {
    this.setStar(this.rating - 1);
  }

  setStar(data: any) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      } else {
        this.starList[i] = true;
      }
    }
  }
}
