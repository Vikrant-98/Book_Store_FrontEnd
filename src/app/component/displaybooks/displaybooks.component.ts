import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BookService } from '../../service/bookservice/book.service';
import { BooksComponent } from '../books/books.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-displaybooks',
  templateUrl: './displaybooks.component.html',
  styleUrls: ['./displaybooks.component.scss']
})
export class DisplaybooksComponent implements OnInit {

  constructor(
    private snackBar : MatSnackBar,
    private bookService : BookService) { }

  @Input() book: any;
  @Output() getBooks: EventEmitter<any> = new EventEmitter();

  addToCart()
  {
    let cartData = {
      BookID: this.book.bookId,
      Quantity: 0
    };
    this.bookService.addToCart(cartData).subscribe(
      (res) => {
        this.snackBar.open('Added to Cart Succesfully', '', {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open('No Cart Added', '', {
          duration: 2000,
        });
      }
    );
  }

  addToWishList()
  {
    let cartData = {
      BookID: this.book.bookId,
      Quantity: 0
    };
    this.bookService.addToWishList(cartData).subscribe(
      (res) => {
        this.snackBar.open('Added to WishList Succesfully', '', {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open('No WishList Added', '', {
          duration: 2000,
        });
      }
    );
  }

  ngOnInit(): void {

  }

}
