import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';
import { AddBooksComponent } from '../add-books/add-books.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../service/dataservice/data.service';
import {PageEvent} from '@angular/material/paginator';
import { Router,NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{

  
  books: any;
  text='';
  sortBy='';
  length: number = 12;
  pageEvent
  mySubscription: any;


  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private data: DataService,
    private router: Router
  ) { 

    
  }

  ngOnInit(): void {
    this.data.share.subscribe( x =>{
      this.text = x 
      this.getSearchBooks()} );
    this.select();
    this.data.shareCommon.subscribe( x =>{
      if(x.type == "getBooks")
      {
        this.getBooks();
      }
    } );
  }


    pageIndex:number = 0;
    pageSize:number = 12;
    lowValue:number = 0;
    highValue:number = 12;
    visibleCart = [];
    visibleWishList = [];     

  getPaginatorData(event){
     console.log(event);
     if(event.pageIndex === this.pageIndex + 1){
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue =  this.highValue + this.pageSize;
       }
    else if(event.pageIndex === this.pageIndex - 1){
       this.lowValue = this.lowValue - this.pageSize;
       this.highValue =  this.highValue - this.pageSize;
      }   
       this.pageIndex = event.pageIndex;
 }

  bookName()
  {
    this.sortBy = 'BookName';
  }
  price()
  {
    this.sortBy = 'Price';
  }
  outOfStock(i)
  {
    this.visibleCart[i] = false;
    this.visibleWishList[i] = true;
  }
  selectCart(i)
  {
    this.visibleCart[i] = true;
    this.visibleWishList[i] = false;
  }
  selectWishList(i)
  {
    this.visibleCart[i] = false;
    this.visibleWishList[i] = true;
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

  addToCart(i)
  {
    let cartData = {
      BookID: this.books[i].bookId
    };
    this.bookService.addToCart(cartData).subscribe(
      (res) => {
        console.log(res);
        this.snackBar.open('Added to Cart Succesfully', '', {
          duration: 2000,
        });
      },
      (err) => {
        console.log(err)
        this.snackBar.open('No Cart Added', '', {
          duration: 2000,
        });
      }
    );
  }

  addToWishList(i)
  {
    let cartData = {
      BookID: this.books[i].bookId,
      Quantity: 0
    };
    this.bookService.addToWishList(cartData).subscribe(
      (res) => {
        this.snackBar.open('Added to WishList Succesfully', '', {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open('No WishList Added', '', {
          duration: 2000,
        });
      }
    );
  }

}

