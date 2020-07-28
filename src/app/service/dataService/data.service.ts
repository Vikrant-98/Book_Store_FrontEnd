import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private book = new BehaviorSubject<any>("");
  public share = this.book.asObservable();

  constructor() { }

  Book(book)
  {
    this.book.next(book);
  }

}
