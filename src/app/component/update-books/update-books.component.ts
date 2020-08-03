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
  SelectFile:File = null;

  onFileSelect(event){
    this.SelectFile = <File>event.target.files[0];
    console.log(this.SelectFile);
  }

  ngOnInit(): void {
    console.log("dialog data",this.data.books.bookId);
    this.BookName = this.data.books.bookName;
    this.AuthorName = this.data.books.authorName;
    this.Price = this.data.books.price;
    this.Available = this.data.books.available;
    this.Description = this.data.books.description;
    this.SelectFile = this.data.books.image;
    console.log("BookName",this.BookName)
  }

  close() {
    this.dialogRef.close({
      BookName : this.BookName,
      AuthorName : this.AuthorName,
      Price : this.Price,
      Available : this.Available,
      Description : this.Description,
      SelectFile : this.SelectFile
    });
  }

}
