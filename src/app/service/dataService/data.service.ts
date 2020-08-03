import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private book = new BehaviorSubject<any>("");
  private order = new BehaviorSubject<any>("");
  public common = new BehaviorSubject({type:"",data:""});
  public cartCount = new BehaviorSubject<number>(0);
  public wishListCount = new BehaviorSubject<number>(0);
  private books = new BehaviorSubject<any>("");
  public share = this.book.asObservable();
  public shareorder = this.order.asObservable();
  public shareCommon = this.common.asObservable();
  public sharebooks = this.books.asObservable();
  public shareCartCount = this.cartCount.asObservable();
  public shareWishListCount = this.wishListCount.asObservable();
  
  constructor() { }

  Book(book)
  {
    this.book.next(book);
  }

  Order(order)
  {
    this.order.next(order);
  }

  Common(data)
  {
    this.common.next(data);
  }

  passWishListCount(data)
  {
    this.wishListCount.next(data);
  }

  passCartCount(data){
    this.cartCount.next(data);
  }

}
