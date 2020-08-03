import { Component,OnInit, Input, Output, EventEmitter, Inject,DoCheck } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { BookService } from '../../service/bookservice/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../service/dataservice/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  constructor(
    private snackBar : MatSnackBar,
    private bookService : BookService,
    private data : DataService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAddress();
  }

  updateText()
  {
    this.data.Order(this.orderID);
  }

  @Input() book: any;
  @Output()getBooks: EventEmitter<any> = new EventEmitter();
  address: Array<any>;
  value = 1;
  addressID: Number;
  orderID: Number;

  isPopUp: boolean = true;
  details: boolean = true;
  
  Name: string
  Locality: String
  PhoneNumber: string
  PinCode: string
  Address: String
  City: string
  LandMark: string

  phoneCheck = /^([1-9]{1}[0-9]{9})$/;
  pinCheck = /^([1-9]{1}[0-9]{5})$/;
  Check = /^[A-Z]{1}[a-z]*$/;
  nameCheck = /^[A-Z]{1}[a-z]{2}[a-z]*$/;

  getAddress()
  {
    this.bookService.getAddress().subscribe(
      (res: any) => {
        this.Name = res.data.name;
        this.Locality = res.data.locality;
        this.PhoneNumber = res.data.phoneNumber;
        this.PinCode = res.data.pinCode;
        this.Address = res.data.userAddress;
        this.City = res.data.city;
        this.LandMark = res.data.landMark;
        },
      (err) => {
        this.snackBar.open('Error occured at get Books', '', {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }


  customerDetailsOpen()
  {
    this.details = false
  }
  
  
  addAddress() {
    console.log("address",this.Address)
    console.log("check", this.phoneCheck.test(this.PhoneNumber))
      if(this.Address !== ''
       &&this.City !== ''
       &&this.Check.test(this.LandMark) !== false
       &&this.Locality !== ''
       &&this.nameCheck.test(this.Name) !== false
       &&this.pinCheck.test(this.PinCode) !== false
       &&this.phoneCheck.test(this.PhoneNumber) !== false
       &&this.value > 0) 
        {     
          let Data = {
          Locality: this.Locality,
          City: this.City,
          PhoneNumber: this.PhoneNumber,
          PinCode: this.PinCode,
          UserAddress: this.Address,
          LandMark: this.LandMark,
          Name: this.Name
      };
    this.bookService.addAddress(Data).subscribe(
        (resp : any) => {
          this.snackBar.open('Address Added Sucessfully', '', {
            duration: 5000,
          });
            this.addressID = resp.data.addressID;
            this.isPopUp = false;
        },
        (err) => {
          this.snackBar.open('something went wrong', '', {
            duration: 4000,
          });
        }
      );
    }
    else
    {
      this.snackBar.open('Fill Valid the Address Details', '', {
        duration: 5000,
      });
    }
  }

  placeOrder()
  {
      let Data = {
        CartId: this.book.cartID,
        Quantity: this.value,
        AddressID: this.addressID
      };
      console.log("Data",Data)
      this.bookService.placeOrder(Data).subscribe(
      (resp : any) => {
      this.getBooks.emit();
      this.snackBar.open('Order Place Sucessfully', '', {
        duration: 5000,
      });
        this.orderID = resp.responcedata.orderID
        this.updateText()
        this.route.navigate(['/dashboard/Order']);
        console.log("OrderID",resp)
      },
    (err) => {
      this.snackBar.open('Something went wrong', '', {
        duration: 4000,
        });
      }
    );
  }

  deleteCart()
  {
    this.bookService.deleteCart(this.book.cartID).subscribe(
      (res) => 
      {
        this.getBooks.emit();
        this.snackBar.open('Cart Removed Succesfully', '', 
        {
          duration: 2000,
        });
        console.log(res);
      },
      (err) => {
        this.snackBar.open('Error occured Remove Cart', '', 
        {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }


}
