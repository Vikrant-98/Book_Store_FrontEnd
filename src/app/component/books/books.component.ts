import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/userservice/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Array<any>;
  
  constructor(
    private bookservice: BookService,
    private snackBar: MatSnackBar,
  ) { }

  getBooks() {
    this.bookservice.getBooks().subscribe(
      (res: any) => {
        this.books = res.data;
        console.log(res.data);
        console.log(res);
        },
      (err) => {
        this.snackBar.open('Error occured at get Books', '', {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.getBooks()
  }

}
