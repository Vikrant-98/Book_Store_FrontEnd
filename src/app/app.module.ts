import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './component/login/login.component';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule} from '@angular/material/radio';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { BooksComponent } from './component/books/books.component';
import { DisplaybooksComponent } from './component/displaybooks/displaybooks.component';
import { CartComponent } from './component/cart/cart.component';
import { WishListComponent } from './component/wish-list/wish-list.component';
import { PlaceOrderComponent } from './component/place-order/place-order.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSliderModule} from '@angular/material/slider';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { ToolBarComponent } from './component/tool-bar/tool-bar.component';
import { IconsComponent } from './component/icons/icons.component';
import { UpdateBooksComponent } from './component/update-books/update-books.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { AddBooksComponent } from './component/add-books/add-books.component';
import { MatMenuModule } from '@angular/material/menu';
import { WishListToCartComponent } from './component/wish-list-to-cart/wish-list-to-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    BooksComponent,
    DisplaybooksComponent,
    CartComponent,
    WishListComponent,
    PlaceOrderComponent,
    AdminDashboardComponent,
    ToolBarComponent,
    IconsComponent,
    UpdateBooksComponent,
    AddBooksComponent,
    WishListToCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSliderModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
