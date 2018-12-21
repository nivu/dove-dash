import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { DoveSnackbarComponent } from "../dove-snackbar/dove-snackbar.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";

  constructor(
    public auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    let user = localStorage.getItem("currentUser");
    //console.log(user);
    if (user && JSON.parse(user).status) {
      this.router.navigate(["/home"]);
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(DoveSnackbarComponent, {
      duration: 1000
    });
  }

  login() {
    this.auth
      .login({ user: this.username, pass: this.password })
      .subscribe(resp => {
        // console.log(resp);
        if (resp.status) {
          this.router.navigate(["/home"]);
        } else {
          // console.log('error');
          this.openSnackBar();
        }
      });
  }
}
