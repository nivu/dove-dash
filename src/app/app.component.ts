import { Component } from "@angular/core";
import { AuthService } from "./core/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  user = { name: "" };
  subscription: Subscription;

  constructor(public auth: AuthService) {
    let sess = localStorage.getItem("currentUser");
    if (sess) {
      // console.log(sess)
      this.user = JSON.parse(sess);
    }
  }

  ngOnInit() {
    this.subscription = this.auth.user.subscribe(user => {
      this.user = user;
      // console.log(user);
    });
  }

  logOut() {
    this.auth.logout();
  }
}
