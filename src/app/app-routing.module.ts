import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from '../app/component/login/login.component';
import { DashboardComponent } from '../app/component/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { BooksComponent } from './component/books/books.component';


const routes: Routes = 
[
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BooksComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
