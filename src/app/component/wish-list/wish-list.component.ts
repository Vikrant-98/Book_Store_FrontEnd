import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/bookservice/book.service';
import { Router,NavigationEnd } from '@angular/router';
import { DataService } from '../../service/dataservice/data.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit,OnDestroy {

  books: any;
  mySubscription: any;


  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private router: Router,
    private data: DataService
  ) { 

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
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

  getWishList() {
    this.bookService.getWishList().subscribe(
      (res: any) => {
        this.data.passWishListCount(res.data.length);
        this.books = res.data;
        console.log(res.data);
        console.log(res);
        },
      (err) => {
        this.snackBar.open('Error occured at get WishList', '', {
          duration: 3000,
        });
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.getWishList()
  }

  deleteWishList(i)
  {
    this.bookService.deleteWishlist(this.books[i].wishListID).subscribe(
      (res) => 
      {
        this.rerunGuradsAndResolvers();
        this.snackBar.open('WishList Removed Succesfully', '', 
        {
          duration: 2000,
        });
        console.log(res);
      },
      (err) => {
        this.snackBar.open('Error occured Remove WishList', '', 
        {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }

  moveToCart(i)
  {
    let WishList = {
      WishListID: this.books[i].wishListID,
  };
    this.bookService.moveToCart(WishList).subscribe(
      (res) => 
      {
        this.rerunGuradsAndResolvers();
        this.snackBar.open('WishList Move To Cart Succesfully', '', 
        {
          duration: 2000,
        });
        console.log(res);
      },
      (err) => {
        this.snackBar.open('Error occured Move Cart', '', 
        {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }


}
