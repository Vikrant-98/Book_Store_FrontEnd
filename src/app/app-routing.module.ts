import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from '../app/component/login/login.component';
import { DashboardComponent } from '../app/component/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { BooksComponent } from './component/books/books.component';
import { CartComponent } from './component/cart/cart.component';
import { WishListComponent } from './component/wish-list/wish-list.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';

const routes: Routes = 
[
  {
    path: 'registration',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BooksComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishList', component: WishListComponent },
      { path: 'Order', component: OrderDetailsComponent}
    ],
  },
  {
    canActivate: [AuthGuard],
    path: 'adminDashboard',
    component: AdminDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
