import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  books: Array<any>;


  constructor(
    private bookservice: BookService,
    private snackBar: MatSnackBar,
  ) { }

  getWishList() {
    this.bookservice.getWishList().subscribe(
      (res: any) => {
        let wishList = res.data.filter((element: any) => {
          return element.isDeleted === false && element.isMoved === false;
        });
        this.books = wishList;
        console.log(res.data);
        console.log('wishList',wishList);
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

  ngOnInit(): void {
    this.getWishList()
  }

}
