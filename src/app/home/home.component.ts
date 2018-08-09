import {
  Component,
  OnInit,
  ViewChild, OnDestroy
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  merge
} from 'rxjs/observable/merge';
import {
  of as observableOf
} from 'rxjs/observable/of';
import {
  catchError
} from 'rxjs/operators/catchError';
import {
  map
} from 'rxjs/operators/map';
import {
  startWith
} from 'rxjs/operators/startWith';
import {
  switchMap
} from 'rxjs/operators/switchMap';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  persons: Person[];

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  gaugeType = "full";
  gaugeValue = [];

  gaugeLabel = "Temperature";
  gaugeAppendText = "C";


  timer;

  constructor(private http: HttpClient) {
    this.timer = setInterval(() => {
      this.getGaugeData();
    }, 3000);
  }

  getGaugeData() {
    this.http.get("http://localhost/tc/fetch_gauge_data.php").subscribe(data => {
      console.log(data);
      console.log(data[1] + ' ' + data[2]);
      // this.gaugeValue = data.slice(1, 33);
    })
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  ngOnInit(): void {

  }


}

