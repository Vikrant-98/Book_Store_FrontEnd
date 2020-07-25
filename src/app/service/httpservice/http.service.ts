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

  getAuthDetails(url) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(environment.baseUrl + url, httpOption);
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

  putBooks(url: string, note: Object) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(environment.baseUrl + url, note, httpOption);
  }

  deleteBooks(url: string) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(environment.baseUrl + url,httpOption);
  }

}
