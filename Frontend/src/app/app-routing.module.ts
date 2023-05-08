import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AllordersComponent } from './Components/orders/allorders/allorders.component';
import { OrderdetailsComponent } from './Components/orders/orderdetails/orderdetails.component';
import { CreateorderComponent } from './Components/orders/createorder/createorder.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders',component: AllordersComponent},
  { path: 'orders/createorder',component:  CreateorderComponent},
  { path: 'orders/:id',component: OrderdetailsComponent},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
