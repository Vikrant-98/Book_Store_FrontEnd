import { Component,OnInit, Input, Output, EventEmitter, Inject,DoCheck } from '@angular/core';
import {BookService } from '../../service/bookservice/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateBooksComponent } from '../update-books/update-books.component';
import { DataService } from '../../service/dataservice/data.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-displaybooks',
  templateUrl: './displaybooks.component.html',
  styleUrls: ['./displaybooks.component.scss']
})
export class DisplaybooksComponent implements OnInit {

  constructor(
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
    private bookService : BookService,
    private data : DataService,
    ) { }

  @Input() book: any;
  @Output()getBooks: EventEmitter<any> = new EventEmitter();
  userBooks: Array<any>;
  view: boolean ;
  Cart: boolean ;
  Wish: boolean = true;
  Role = localStorage.getItem('userCategory');
 

  ngOnInit(): void {
    this.userSelection();
    if(this.Role === "User")
    {
      this.getUserBooks();
    }
    
  }

  userSelection()
  {
    if(this.Role === "User")
    {
      this.view = true;
    }
    else
    {
      this.view = false;
    }
  }

  
  getUserBooks()
  {
    this.bookService.getCart().subscribe(
      (res: any) => {
        this.userBooks = res.data;
        this.Cart = res.data.isDeleted;
        }
    );
    
  }

  

  openBookDialog(): void 
  {
    const dialogRef = this.dialog.open(UpdateBooksComponent, 
    {
      data: { book: this.book },
      panelClass: 'updateDialog'
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        let updateData = {
          BookName: res.BookName,
          AuthorName: res.AuthorName,
          Description: res.Description,
          Price: res.Price,
          Available: res.Available
        };
        if(res.SelectFile.name !== undefined){
        console.log("file",res.SelectFile)
        const fd = new FormData();
        fd.append('image',res.SelectFile,res.SelectFile.name) 
        this.bookService.addImage(this.book.bookId,fd).subscribe(
          (res) => 
          {
            this.getBooks.emit();
            console.log("Image responce",res);
          },
          (err) => 
          {
            this.snackBar.open('Error occured In Image Update', '', 
            {
              duration: 2000,
            });
            console.log("Error",err);
          }
        );   
        }
        
        this.bookService.updateBook(this.book.bookId,updateData).subscribe(
          (res) => 
          { 
            this.getBooks.emit();
            console.log("update",res);
            console.log("update",updateData);
          },
          (err) => 
          {
            this.snackBar.open('Error occured update Book', '', 
            {
              duration: 2000,
            });
            console.log(err);
          }
        );
      }
    });
    
  }

  deleteBook() 
  {
    this.bookService.deleteBook(this.book.bookId).subscribe(
      (res) => 
      {
        this.getBooks.emit();
        this.snackBar.open('Book Deleted Succesfully', '', 
        {
          duration: 2000,
        });
        console.log(res);
      },
      (err) => {
        this.snackBar.open('Error occured While delete', '', 
        {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }

  addToCart()
  {
    let cartData = {
      BookID: this.book.bookId
    };
    this.bookService.addToCart(cartData).subscribe(
      (res) => {
        this.getBooks.emit();
        console.log(res)
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

  addToWishList()
  {
    let cartData = {
      BookID: this.book.bookId,
      Quantity: 0
    };
    this.bookService.addToWishList(cartData).subscribe(
      (res) => {
        this.getBooks.emit();
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
