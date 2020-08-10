import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';
import { DataService } from '../../service/dataservice/data.service';
import { Router,NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public books: any;
  mySubscription: any;


  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private data : DataService,
    private router: Router
  ) { 

    console.log("This is cart")

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

  }

  ngOnInit(): void {
    this.getCart();
    this.getAddress();
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


  getCart() {
    this.bookService.getCart().subscribe(
      (res: any) => {
        let cart = res.data.filter((element: any) => {
          return element.isDelete === false && element.isActive === true;
        });
        this.books = cart;
        console.log(res.data);
        console.log('cart',cart);
        console.log(res);
        },
      (err) => {
        this.snackBar.open('Error occured at get Cart', '', {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }

  updateText()
  {
    this.data.Order(this.orderID);
  }

  
  address: Array<any>;
  value = [];
  addressID: Number;
  orderID: Number;

  isPopUp: boolean = true;
  details: boolean = true;
  continue: boolean = true;
  hide: boolean = true;
  
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
      this.details = false;
      this.hide = false;
  }
  
  valueIncrement(i){
    this.value[i]++
  }

  valueDecrement(i){
    this.value[i]--
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
       &&this.phoneCheck.test(this.PhoneNumber) !== false) 
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
            this.continue = false;
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

    for (let i = 0; i < this.books.length && this.value[i] > 0; i++) {
    
      let Data = {
        CartId: this.books[i].cartID,
        Quantity: this.value[i],
        AddressID: this.addressID
      };
      console.log("Data",Data)
      this.bookService.placeOrder(Data).subscribe(
      (resp : any) => {
      this.snackBar.open('Order Place Sucessfully', '', {
        duration: 5000,
      });
        this.orderID = resp.responcedata.orderID
        this.updateText()
        this.router.navigate(['/dashboard/Order']);
        console.log("OrderID",resp)
      },
    (err) => {
      this.snackBar.open('Something went wrong', '', {
        duration: 4000,
        });
      }
    );
    }
  }

  deleteCart(i)
  {
    this.bookService.deleteCart(this.books[i].cartID).subscribe(
      (res) => 
      {
        this.rerunGuradsAndResolvers();
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
