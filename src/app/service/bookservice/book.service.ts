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

  getSearchBooks(text) 
  {
    return this.httpService.get(`Books?Search=${text}`);
  }

  getSortBooks(text) 
  {
    return this.httpService.get(`Books?OrderBy=${text}`);
  }

  getUserBooks() 
  {
    return this.httpService.getAuthDetails('Books/Cart');
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

  moveToCart(data)
  {
    return this.httpService.postData('WishList/MoveToCart',data); 
  }

  placeOrder(data)
  {
    return this.httpService.postData('Order/PlaceOrder',data);
  }

  deleteWishlist(wishListID)
  {
    return this.httpService.delete(`WishList/${wishListID}`); 
  }

  addBook(data)
  {
    return this.httpService.postData('Books',data);
  }

  addImage(BookID,Image)
  {
    return this.httpService.putImage(`Books/${BookID}/Image`,Image);
  }

  deleteCart(BookId)
  {
    return this.httpService.delete(`Cart/${BookId}`);
  }

  addAddress(data)
  {
    return this.httpService.postData(`Order/AddAddress`,data);
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
    return this.httpService.delete(`Books/${BookId}`);
  }

  getAddress()
  {
    return this.httpService.getAuthDetails('Order/Address');
  }

}
