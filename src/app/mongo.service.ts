import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { hl7 } from './models/hl7.model'

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/hl7/get'

  public getLocalData() {
    return this.http.get('assets/JSONObject.json');
  }

  public getAllRecords() {
    return this.http.get(this.url);
  }

  public queryRecords(data) {
    return this.http.post('http://localhost:8080/hl7/query', data);
  }

  public searchRecords(search: string) {
    return this.http.post('http://localhost:8080/hl7/search', search);
  }
}
