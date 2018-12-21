import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: "root"
})
export class BmmRestService {
  //public baseUrlMedi: string = "http://localhost/bmm/";

  public baseUrlMedi: string = "http://livemonitoring.co.in/bmm/";

  constructor() {}
}
