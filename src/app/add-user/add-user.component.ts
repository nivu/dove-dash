import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  name: string = "Nivu";
  email: string = "va@g.co";

  constructor(private http: HttpClient) {}
  ngOnInit() {}

  addData(e) {
    this.http
      .post("http://localhost:3000/user", {
        name: this.name,
        email: this.email
      })
      .subscribe(data => {
        console.log(data);
      });
  }
}
