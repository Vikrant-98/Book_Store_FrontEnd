import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.scss']
})
export class UpdateBooksComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateBooksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  BookName: string;
  AuthorName: string;
  Price: string;
  Description: string;
  Available: Number;

  ngOnInit(): void {
    this.BookName = this.data.book.bookName;
    this.AuthorName = this.data.book.authorName;
    this.Price = this.data.book.price;
    this.Available = this.data.book.available;
    this.Description = this.data.book.description;
  }

  close() {
    this.dialogRef.close({
      BookName : this.BookName,
      AuthorName : this.AuthorName,
      Price : this.Price,
      Available : this.Available,
      Description : this.Description,
    });
  }

}
