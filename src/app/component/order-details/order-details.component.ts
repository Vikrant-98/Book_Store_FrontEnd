import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/dataservice/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderID: Number;

  constructor(
    private data: DataService,
    private route: Router

  ) { }

  ngOnInit(): void {
    this.data.shareorder.subscribe( x =>{
      this.orderID = x } );
  }

  continueShopping()
  {
    this.route.navigate(['/dashboard']);
  }

}
