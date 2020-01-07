import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: any = [];
  constructor(private http: HttpClient) {
    this.users = [];
  }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get("http://localhost:3000/users").subscribe(data => {
      console.log(data);
      this.users = data.data;
    });
  }
}
