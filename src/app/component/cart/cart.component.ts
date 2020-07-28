import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  books: Array<any>;

  constructor(
    private bookservice: BookService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this.bookservice.getCart().subscribe(
      (res: any) => {
        let cart = res.data.filter((element: any) => {
          return element.isDelete === false && element.isActive === true;
        });
        this.books = cart;
        console.log(res.data);
        console.log('cart',cart);
        console.log(res);
        },
      (err) => {
        this.snackBar.open('Error occured at get Cart', '', {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }

  

}
