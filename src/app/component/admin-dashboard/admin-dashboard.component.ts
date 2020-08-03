import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBooksComponent } from '../update-books/update-books.component';
import { AddBooksComponent } from '../add-books/add-books.component';
import { DataService } from '../../service/dataservice/data.service';
import { Router,NavigationEnd } from '@angular/router';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit,OnDestroy {

  book: any;
  mySubscription: any;

  constructor(
    private dialog : MatDialog,
    private bookservice: BookService,
    private snackBar: MatSnackBar,
    private data: DataService,
    private router: Router
  ) { 

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

  }

  ngOnInit(): void {
    this.getBooks();
    this.data.shareCommon.subscribe( x =>{
      if(x.type == "getBooks")
      {
        this.getBooks();
      }
    } );
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  rerunGuradsAndResolvers() {
    const defaltOnSameUrlNavigation = this.router.onSameUrlNavigation;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(this.router.url, {
      replaceUrl: true
    });
    this.router.onSameUrlNavigation = defaltOnSameUrlNavigation;
  }

  getBooks() {
    this.bookservice.getBooks().subscribe(
      (res: any) => {
        this.book = res.data;
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
        this.bookservice.addBook(bookData).subscribe(
          (res) => 
          { 
            this.data.Common({type:"getBooks",data:""})
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

  openBookDialog(i): void 
  {
    const dialogRef = this.dialog.open(UpdateBooksComponent, 
    {
      data: { books: this.book[i] },
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
        console.log("update data",updateData);
        if(res.SelectFile.name !== undefined){
        console.log("file",res.SelectFile);
        const fd = new FormData();
        fd.append('image',res.SelectFile,res.SelectFile.name) 
        this.bookservice.addImage(this.book[i].bookId,fd).subscribe(
          (res) => 
          {
            this.rerunGuradsAndResolvers();
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
        
        this.bookservice.updateBook(this.book[i].bookId,updateData).subscribe(
          (res) => 
          { 
            this.rerunGuradsAndResolvers();
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

  deleteBook(i) 
  {
    console.log("BookID",this.book[i].bookId);

    this.bookservice.deleteBook(this.book[i].bookId).subscribe(
      (res) => 
      {
        this.rerunGuradsAndResolvers();
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

  signOut() {
    this.router.navigate(['']);
    this.snackBar.open('User Sign out Sucessfully', '', {
      duration: 2000,
    });
    localStorage.clear();
  }

}
