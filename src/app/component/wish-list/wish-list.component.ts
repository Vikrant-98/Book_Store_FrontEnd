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
        this.books = res.data;
        console.log(res.data);
        console.log(res);
        },
      (err) => {
        this.snackBar.open('Error occured at get WishList', '', {
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
