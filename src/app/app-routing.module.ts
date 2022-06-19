import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompletedListComponent } from './completedlist/completedlist.component';

const routes: Routes = [
  {path:'', redirectTo:'viewlist', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'wishlist', component:WishlistComponent},
  {path:'completedlist', component:CompletedListComponent},
  {path:'viewlist', component:BookDashboardComponent},
  {path:'dashboard', component:BookDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
