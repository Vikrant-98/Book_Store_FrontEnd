import { Output, EventEmitter, Component, OnInit,DoCheck, OnChanges, SimpleChange} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBooksComponent } from '../add-books/add-books.component'
import { BookService } from '../../service/bookservice/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../service/dataservice/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Output()getBooks: EventEmitter<any> = new EventEmitter();

  
  search: string;
  view: boolean ;
  cartCount : any;
  wishListCount : any;
  Role = localStorage.getItem('userCategory');
  FirstName = localStorage.getItem('FirstName');
  LastName = localStorage.getItem('LastName');
  EmailID = localStorage.getItem('Email');

  constructor(
    private snackBar : MatSnackBar,
    private bookService : BookService,
    private dialog : MatDialog,
    private data : DataService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.userSelection();
    this.getUserBooks();
    this.getWishList();
    this.data.cartCount.subscribe( x =>{
      this.cartCount = x } );
    this.data.shareWishListCount.subscribe( x =>{
    this.wishListCount = x } );
  }

  updateText()
  {
    this.data.Book(this.search);
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

  
  
  signOut() {
    this.route.navigate(['']);
    this.snackBar.open('User Sign out Sucessfully', '', {
      duration: 2000,
    });
    localStorage.clear();
  }

  getUserBooks()
  {
    this.bookService.getCart().subscribe(
      (res: any) => {
        this.cartCount = res.data.length;
        }
    );
    
  }

  getWishList() {
    this.bookService.getWishList().subscribe(
      (res: any) => {
          this.wishListCount = res.data.length
        }
    );
  }
}
