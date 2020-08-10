import { Component,OnInit, Output, EventEmitter} from '@angular/core';
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
  ) { 
    
  }

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

}
