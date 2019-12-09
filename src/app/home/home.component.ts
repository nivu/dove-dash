import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  gaugeType = "full";
  gaugeValue = [];

  gaugeLabel = "Temperature";
  gaugeAppendText = "C";

  analogLabel = "Analog";
  analogAppendText = "V";

  timer;
  lastUpdate;
  analog;

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.getGaugeData();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getGaugeData() {
    this.http
      .get(this.auth.baseUrl + "fetch_gauge_data.php")
      .subscribe(data => {
        // console.log(data);
        let gaugeValue = data as number[];
        this.gaugeValue = gaugeValue.slice(1, 33);
        this.lastUpdate = gaugeValue[33];
        this.analog = gaugeValue[34];
      });
  }
}
