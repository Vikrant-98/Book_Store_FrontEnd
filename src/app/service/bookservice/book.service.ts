import { Injectable } from '@angular/core';
import { HttpService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpService) {}
  
  getBooks() 
  {
    return this.httpService.get('Books');
  }

  login(loginData) {
    return this.httpService.post('Users/login', loginData);
  }

  addToCart(data)
  {
    return this.httpService.postData('Cart',data);
  }

  addToWishList(data)
  {
    return this.httpService.postData('WishList',data);
  }

}
