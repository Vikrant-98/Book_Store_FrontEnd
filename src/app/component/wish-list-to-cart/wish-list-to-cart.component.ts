import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wish-list-to-cart',
  templateUrl: './wish-list-to-cart.component.html',
  styleUrls: ['./wish-list-to-cart.component.scss']
})
export class WishListToCartComponent implements OnInit {

  constructor() { }

  @Input() book: any;

  ngOnInit(): void {
  }

}
