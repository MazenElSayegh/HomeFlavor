import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AllordersComponent } from './Components/orders/allorders/allorders.component';
import { OrderdetailsComponent } from './Components/orders/orderdetails/orderdetails.component';
import { AllStoresComponent } from './Components/stores/all-stores/all-stores.component';
import { StoreDetailsComponent } from './Components/stores/store-details/store-details.component';
import { CreateStoreComponent } from './Components/stores/create-store/create-store.component';
import { UpdateStoreComponent } from './Components/stores/update-store/update-store.component';
import { DeleteStoreComponent } from './Components/stores/delete-store/delete-store.component';
import { CreateorderComponent } from './Components/orders/createorder/createorder.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: AllordersComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
