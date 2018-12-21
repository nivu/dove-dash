import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  name = "anand";
  constructor() {
    setTimeout(() => {
      this.name = "raj";
    }, 3000);
  }

  ngOnInit() {}
}
