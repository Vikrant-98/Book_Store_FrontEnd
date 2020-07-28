import { Output, EventEmitter, Component, OnInit,DoCheck} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBooksComponent } from '../add-books/add-books.component'
import { BookService } from '../../service/bookservice/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../service/dataservice/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,DoCheck {

  @Output()getBooks: EventEmitter<any> = new EventEmitter();

  
  search: string;
  view: boolean ;
  cart: any;
  Role = localStorage.getItem('userCategory');

  constructor(
    private snackBar : MatSnackBar,
    private bookService : BookService,
    private dialog : MatDialog,
    private data : DataService,

  ) {
  }

  ngDoCheck(): void
  {
    //this.getUserBooks();
  }

  ngOnInit(): void {
    this.userSelection();
    this.getUserBooks();
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
            this.getBooks.emit();
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
  
  getUserBooks()
  {
    this.bookService.getCart().subscribe(
      (res: any) => {
        this.cart = res.data;
        }
    );
    
  }
  
  
}
