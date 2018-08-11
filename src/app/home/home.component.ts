import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gaugeType = "full";
  gaugeValue = [];

  gaugeLabel = "Temperature";
  gaugeAppendText = "C";

  timer;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.getGaugeData();
    }, 3000);
  }

  getGaugeData() {
    this.http.get("http://livemonitoring.co.in/ciet/scripts/fetch_gauge_data.php").subscribe(data => {
      let gaugeValue = data as number[];
      this.gaugeValue = gaugeValue.slice(1, 33);
    })
  }
}

