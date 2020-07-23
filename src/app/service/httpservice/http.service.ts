import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  id = localStorage.getItem('id');
  header = {
    id: this.id,
  };

  httpOption = new HttpHeaders(this.header);

  post(url, userData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(environment.baseUrl + url, userData, httpOptions);
  }

  get(url) {
    return this.http.get(environment.baseUrl + url);
  }

  postData(url: string, data: Object) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(environment.baseUrl + url, data, httpOption);
  }

}
