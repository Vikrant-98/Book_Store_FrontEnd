import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { UserService } from '../../service/userservice/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  userCategory : string;

  user : any = [
    'Admin',
    'User'
  ];

  radioChangeHandler(event:any){
    this.userCategory = event.target.value;
    console.log(this.userCategory)
  }

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  Email = new FormControl('', [Validators.email, Validators.required]);
  Password = new FormControl('', [
    Validators.minLength(8),
    Validators.maxLength(15),
    Validators.required,
  ]);

  getEmailErrorMessage() {
    return this.Email.hasError('required')
      ? 'Email is Required'
      : 'please enter valid email';
  }

  getPasswordErrorMessage() {
    return this.Password.hasError('required')
      ? 'Password is Required '
      : 'Password should be minimum of 8 characters';
  }

  onLogin()
  {
    if(this.userCategory === "Admin")
    {
        this.AdminLogin();
    }
    else if(this.userCategory === "User")
    {
        this.UserLogin();
    }
    else
    {
      this.snackBar.open('Select User Category', '', {
        duration: 6000,
      });
    }
  }

  AdminLogin(){
    let userData = {
      EmailID: this.Email.value,
      Password: this.Password.value
    };
    this.userService.Adminlogin(userData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.jsontoken);
        localStorage.setItem('userCategory', response.result.userCategory);
        this.snackBar.open('Admin Login Sucessfully', '', {
          duration: 2000,
        });
        console.log(response)
        this.route.navigate(['/adminDashboard']);
      },
      (err) => {
        this.snackBar.open('Please enter valid Email and Password', '', {
          duration: 4000,
        });
      }
    );
  }

  UserLogin() {
    let userData = {
      EmailID: this.Email.value,
      Password: this.Password.value
    };
    this.userService.login(userData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.jsontoken);
        localStorage.setItem('userCategory', response.result.userCategory);
        this.snackBar.open('User Login Sucessfully', '', {
          duration: 2000,
        });
        console.log(response)
        this.route.navigate(['/dashboard']);
      },
      (err) => {
        this.snackBar.open('Please enter valid Email and Password', '', {
          duration: 4000,
        });
      }
    );
  }
  ngOnInit(): void {}

}
