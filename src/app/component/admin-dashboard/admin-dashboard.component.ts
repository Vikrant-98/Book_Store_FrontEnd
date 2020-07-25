import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  books: Array<any>;

  constructor(
    private bookservice: BookService,
    private snackBar: MatSnackBar,
  ) { }

  getBooks() {
    this.bookservice.getBooks().subscribe(
      (res: any) => {
        this.books = res.data;
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
    this.getBooks();
  }

}
