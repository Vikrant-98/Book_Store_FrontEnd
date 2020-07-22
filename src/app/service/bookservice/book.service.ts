import { Injectable } from '@angular/core';
import { HttpService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpService) {}
  
  getBooks() 
  {
    return this.httpService.get('api/Books');
  }
}
