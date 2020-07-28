import { Component, OnInit, Output, EventEmitter,DoCheck, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';
import { AddBooksComponent } from '../add-books/add-books.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../service/dataservice/data.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{

  
  books: Array<any>;
  text='';
  sortBy='';


  constructor(
    private dialog : MatDialog,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.data.share.subscribe( x =>{
      this.text = x 
      this.getSearchBooks()} );
    this.select()
  }

  

  bookName()
  {
    this.sortBy = 'BookName';
  }
  price()
  {
    this.sortBy = 'Price';
  }

  select(){
    if(this.text !== '')
    {
      this.getSearchBooks();
    }
    else if(this.sortBy !== '')
    {
      this.getSortBooks();
    }
    else
    {
      this.getBooks();
    }
  }
  
  getSearchBooks()
  {
    this.bookService.getSearchBooks(this.text).subscribe(
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

  getSortBooks()
  {
    this.bookService.getSortBooks(this.sortBy).subscribe(
      (res: any) => {
        let book = res.data.filter((element: any) => {
          return element.isDeleted === false;
        });
        this.books = book;
        },
      (err) => {
        this.snackBar.open('Error occured at get Books', '', {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
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

  openDialog()
  {
    const dialogRef = this.dialog.open(AddBooksComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        let bookData = {
          BookName: res.BookName,
          AuthorName: res.AuthorName,
          Description: res.Description,
          Price: res.Price,
          Pages: res.Pages,
          Available: res.Available
        };
        this.bookService.addBook(bookData).subscribe(
          (res) => 
          { 
            console.log("addBook responce",res);
            console.log("addBook data",bookData);
          },
          (err) => 
          {
            this.snackBar.open('Error occured Add Books', '', 
            {
              duration: 2000,
            });
            console.log(err);
          }
        );    
      }
    });
  }


}
