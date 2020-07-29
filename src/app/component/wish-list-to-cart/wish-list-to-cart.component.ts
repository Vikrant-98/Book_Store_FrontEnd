import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { BookService } from '../../service/bookservice/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wish-list-to-cart',
  templateUrl: './wish-list-to-cart.component.html',
  styleUrls: ['./wish-list-to-cart.component.scss']
})
export class WishListToCartComponent implements OnInit {

  constructor(
    private snackBar : MatSnackBar,
    private bookService : BookService
  ) { }

  @Input() book: any;
  @Output()getWishList: EventEmitter<any> = new EventEmitter();


  ngOnInit(): void {
  }

  deleteCart()
  {
    this.bookService.deleteWishlist(this.book.wishListID).subscribe(
      (res) => 
      {
        this.getWishList.emit();
        this.snackBar.open('WishList Removed Succesfully', '', 
        {
          duration: 2000,
        });
        console.log(res);
      },
      (err) => {
        this.snackBar.open('Error occured Remove WishList', '', 
        {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }

  moveTOCart()
  {
    let WishList = {
      WishListID: this.book.wishListID,
  };
    this.bookService.moveToCart(WishList).subscribe(
      (res) => 
      {
        this.getWishList.emit();
        this.snackBar.open('WishList Move To Cart Succesfully', '', 
        {
          duration: 2000,
        });
        console.log(res);
      },
      (err) => {
        this.snackBar.open('Error occured Move Cart', '', 
        {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }

}
