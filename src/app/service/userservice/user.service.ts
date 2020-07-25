import { Injectable } from '@angular/core';
import { HttpService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) {}

  register(registerData) {
    return this.httpService.post('Users', registerData);
  }

  login(loginData) {
    return this.httpService.post('Users/login', loginData);
  }

  Adminlogin(loginData) {
    return this.httpService.post('Admin/login', loginData);
  }

}
