import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import { of as observableOf } from "rxjs/observable/of";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { startWith } from "rxjs/operators/startWith";
import { switchMap } from "rxjs/operators/switchMap";
import { AuthService } from "../core/auth.service";
import { Angular5Csv } from "angular5-csv/Angular5-csv";

@Component({
  selector: "app-logger",
  templateUrl: "./logger.component.html",
  styleUrls: ["./logger.component.scss"]
})
export class LoggerComponent implements OnInit {
  displayedColumns = [
    "id",
    "ch1",
    "ch2",
    "ch3",
    "ch4",
    "ch5",
    "ch6",
    "ch7",
    "ch8",
    "ch9",
    "ch10",
    "ch11",
    "ch12",
    "ch13",
    "ch14",
    "ch15",
    "ch16",
    "ch17",
    "ch18",
    "ch19",
    "ch20",
    "ch21",
    "ch22",
    "ch23",
    "ch24",
    "ch25",
    "ch26",
    "ch27",
    "ch28",
    "ch29",
    "ch30",
    "ch31",
    "ch32",
    "time"
  ];
  exampleDatabase: ExampleHttpDao | null;
  data: GithubIssue[] = [];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  from: Date;
  to: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient, public auth: AuthService) {}

  downloadData() {
    console.log("from => ", this.formatFromDate(this.from));
    console.log("to => ", this.formatToDate(this.to));
    this.auth
      .downloadLogger(
        this.formatFromDate(this.from),
        this.formatToDate(this.to)
      )
      .subscribe(resp => {
        new Angular5Csv(JSON.parse(resp._body).data, "report");
      });
  }

  formatFromDate(date) {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " 00:00:00"
    );
  }

  formatToDate(date) {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " 23:59:59"
    );
  }

  ngOnInit() {
    this.paginator.pageSize = 10;
    this.exampleDatabase = new ExampleHttpDao(this.http, this.auth);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map(data => {
          console.log(data);
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe(data => (this.dataSource.data = data));
  }
}
export interface GithubApi {
  data: GithubIssue[];
  total_count: number;
}
export interface GithubIssue {
  id: number;
  ch1: string;
  ch2: string;
  ch3: string;
  ch4: string;
  ch5: string;
  ch6: string;
  ch7: string;
  ch8: string;
  ch9: string;
  ch10: string;
  ch11: string;
  ch12: string;
  ch13: string;
  ch14: string;
  ch15: string;
  ch16: string;
  ch17: string;
  ch18: string;
  ch19: string;
  ch20: string;
  ch21: string;
  ch22: string;
  ch23: string;
  ch24: string;
  ch25: string;
  ch26: string;
  ch27: string;
  ch28: string;
  ch29: string;
  ch30: string;
  ch31: string;
  ch32: string;
  time: string;
}
/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient, public auth: AuthService) {}
  getRepoIssues(
    sort: string,
    order: string,
    page: number,
    size: number
  ): Observable<any> {
    console.log(sort, order, page, size);
    //http://localhost/tc/fetch_json.php?page=0&size=10&order
    const requestUrl =
      this.auth.baseUrl +
      "fetch_json.php" +
      "?page=" +
      page +
      "&order=" +
      order +
      "&size=" +
      size;
    return this.http.get<any>(requestUrl);
  }
}
