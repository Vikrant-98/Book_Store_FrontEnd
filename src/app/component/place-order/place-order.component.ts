import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { BookService } from '../../service/bookservice/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  constructor(
    private snackBar : MatSnackBar,
    private bookService : BookService
  ) { }
  @Input() book: any;
  value = 1;

  isPopUp: boolean = true;
  details: boolean = true;
  
  Name = new FormControl('', [
    Validators.pattern('[a-zA-Z ]*'),
    Validators.minLength(3),
    Validators.required,
  ]);
  Locality = new FormControl('', [
    Validators.pattern('[a-zA-Z0-9 ]*'),
    Validators.minLength(3),
    Validators.required,
  ]);
  PhoneNumber = new FormControl('', [
    Validators.pattern('[0-9]{10}'),
    Validators.required,
  ]);
  PinCode = new FormControl('', [
    Validators.pattern('[0-9]{6}'),
    Validators.required,
  ]);
  Address = new FormControl('', [
    Validators.pattern('[a-zA-Z0-9 ]*'),
    Validators.minLength(3),
    Validators.required,
  ]);
  City = new FormControl('', [
    Validators.pattern('[a-zA-Z ]*'),
    Validators.minLength(3),
    Validators.required,
  ]);

  LandMark= new FormControl('', [
    Validators.pattern('[a-zA-Z ]*'),
    Validators.minLength(3),
    Validators.required,
  ]);

  getNameErrorMessage() {
    return this.Name.hasError('required')
      ? 'Name is Required'
      : 'Name should be minimum of 3 characters without leading/following spaces ';
  }
  getLocalityErrorMessage() {
    return this.Locality.hasError('required')
      ? 'Locality is Required'
      : 'Locality should be Valid ';
  }
  getPhoneNumberErrorMessage() {
    return this.PhoneNumber.hasError('required')
      ? 'PhoneNumber is Required'
      : 'Please enter valid PhoneNumber';
  }
  getPinCodeErrorMessage() {
    return this.PinCode.hasError('required')
      ? 'PinCode is Required '
      : 'Please enter valid PinCode';
  }
  getAddressErrorMessage() {
    return this.Address.hasError('required')
      ? 'Address is Required'
      : 'Please enter valid Address';
  }
  getCityErrorMessage() {
    return this.City.hasError('required')
      ? 'City is Required'
      : 'Please enter valid City';
  }
  getLandMarkErrorMessage() {
    return this.LandMark.hasError('required')
      ? 'LandMark is Required '
      : 'Please enter valid LandMark';
  }

  openCard() {
    this.isPopUp = false;
  }
  customerDetailsOpen()
  {
    this.details = false
  }
  customerDetailsClose()
  {
    this.details = true
  }
  
  onSubmit() {
      if(this.Name.touched   && 
        this.Locality.touched &&
        this.LandMark.touched &&
        this.PhoneNumber.touched &&
        this.PinCode.touched &&
        this.City.touched &&
        this.Address.touched &&
        this.value > 0) {
      let cartData = {
          Locality: this.Locality.value,
          City: this.City.value,
          PhoneNumber: this.PhoneNumber.value,
          PinCode: this.PinCode.value,
          UserAddress: this.Address.value,
          LandMark: this.LandMark.value,
          Name: this.Name.value
      };
      let quantity = {
        BookID: this.book.bookID,
        Quantity: this.value
    };
    this.bookService.quantity(quantity).subscribe(
      (resp) => {
        this.snackBar.open('Quantity Updated Sucessfully', '', {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open('This much Quantity is not Available', '', {
          duration: 4000,
        });
      }
    );
    this.bookService.placeOrder(this.book.cartID,cartData).subscribe(
        (resp) => {
          this.snackBar.open('Order Place Sucessfully', '', {
            duration: 5000,
          });
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
      this.snackBar.open('Fill the Address Details', '', {
        duration: 5000,
      });
    }
  }

  ngOnInit(): void {
  }

}
