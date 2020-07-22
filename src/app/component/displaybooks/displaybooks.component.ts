import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-displaybooks',
  templateUrl: './displaybooks.component.html',
  styleUrls: ['./displaybooks.component.scss']
})
export class DisplaybooksComponent implements OnInit {

  constructor() { }

  @Input() book: any;
  @Output() getBooks: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

}
