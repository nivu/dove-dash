import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serviceUrl = 'http://192.168.1.112/tc/fetch_json.php';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceUrl);
  }
}
