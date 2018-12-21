import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BmmRestService } from "../services/bmm-rest/bmm-rest.service";

@Component({
  selector: "app-bio-med",
  templateUrl: "./bio-med.component.html",
  styleUrls: ["./bio-med.component.scss"]
})
export class BioMedComponent implements OnInit {
  timer;

  userId;

  bpData: any = {
    deviceId: "",
    systole: 0,
    diastole: 0,
    pulse: 0,
    last_bp: "",
    temp: 0,
    last_temp: ""
  };

  constructor(private bmmRest: BmmRestService, private http: HttpClient) {
    this.userId = 1;
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.getMediData();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getMediData() {
    this.http
      .get(
        this.bmmRest.baseUrlMedi + "fetch_dash_data.php?userId=" + this.userId
      )
      .subscribe(data => {
        console.log(data);
        this.bpData = data;
      });
  }
}
