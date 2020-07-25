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

  getCart()
  {
    return this.httpService.getAuthDetails('Cart');
  }
  
  getWishList()
  {
    return this.httpService.getAuthDetails('WishList');
  }

  addToCart(data)
  {
    return this.httpService.postData('Cart',data);
  }

  addToWishList(data)
  {
    return this.httpService.postData('WishList',data);
  }

  placeOrder(cartId,data)
  {
    return this.httpService.postData(`Order/${cartId}/PlaceOrder`,data);
  }

  quantity(data)
  {
    return this.httpService.postData(`Cart`,data);
  }

  updateBook(BookId,data)
  {
    return this.httpService.putBooks(`Books/${BookId}`,data);
  }

  deleteBook(BookId)
  {
    return this.httpService.deleteBooks(`Books/${BookId}`);
  }

}
