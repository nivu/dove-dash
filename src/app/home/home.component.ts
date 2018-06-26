import {
  Component,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
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

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  displayedColumns = ['id', 'a', 'd', 'time'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  gaugeType = "full";
  gaugeValue = 28.3;
  gaugeValue1 = 28.3;
  gaugeValue2 = 28.3;
  gaugeValue3 = 28.3;

  gaugeLabel = "Temperature";
  gaugeAppendText = "C";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    setInterval(() => {
      this.getGaugeData();
    }, 3000);
  }

  getGaugeData() {
    this.http.get("http://localhost/tc/fetch_gauge_data.php").subscribe(data => {
      console.log(data[1] + ' ' + data[2]);
      this.gaugeValue = data[1];
      this.gaugeValue1 = data[2];

    })
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  id: number;
  a: string;
  d: string;
  time: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) { }

  getRepoIssues(sort: string, order: string, page: number): Observable<any> {
    const requestUrl = 'http://localhost/tc/fetch_json.php';

    return this.http.get<any>(requestUrl);
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */