import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private book = new BehaviorSubject<any>("");
  private order = new BehaviorSubject<any>("");
  public share = this.book.asObservable();
  public shareorder = this.order.asObservable();
  constructor() { }

  Book(book)
  {
    this.book.next(book);
  }

  Order(order)
  {
    this.order.next(order);
  }

}
