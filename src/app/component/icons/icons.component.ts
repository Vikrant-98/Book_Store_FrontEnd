import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBooksComponent } from '../update-books/update-books.component'

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  constructor(
    private dialog : MatDialog 
  ) { }

  @Output() toCart: EventEmitter<any> = new EventEmitter();
  @Output() toWishList: EventEmitter<any> = new EventEmitter();
  @Output() dialogResponce: EventEmitter<any> = new EventEmitter();


  view: boolean = true;

  addToCart()
  {
    this.toCart.emit();
  }

  addToWishList()
  {
    this.toWishList.emit();
  }  

  openLabelDialog(): void 
  {
    this.dialogResponce.emit();
  } 

  ngOnInit(): void {
  }

}
