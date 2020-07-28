import { Component,OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {BookService } from '../../service/bookservice/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {

  @Output()getBooks: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddBooksComponent>
  ) { }

  BookName: string;
  AuthorName: string;
  Price: string;
  Description: string;
  Available: Number;
  Pages: Number;

  close() {
    this.dialogRef.close({
      BookName : this.BookName,
      AuthorName : this.AuthorName,
      Price : this.Price,
      Pages : this.Pages,
      Available : this.Available,
      Description : this.Description,
    });
  }
  ngOnInit(): void {
  }

  // addBook(): void 
  // {
  //       let bookData = {
  //         BookName: this.BookName,
  //         AuthorName: this.AuthorName,
  //         Description: this.Description,
  //         Price: this.Price,
  //         Pages: this.Pages,
  //         Available: this.Available
  //       };
        
  //       this.bookService.addBook(bookData).subscribe(
  //         (res) => 
  //         { 
  //           this.getBooks.emit();
  //           console.log("addBook responce",res);
  //           console.log("addBook data",bookData);
  //         },
  //         (err) => 
  //         {
  //           this.snackBar.open('Error occured Add Books', '', 
  //           {
  //             duration: 2000,
  //           });
  //           console.log(err);
  //         }
  //       );    
  // }
  
  

}
