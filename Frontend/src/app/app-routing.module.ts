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
import { AllMenuComponent } from './Components/menus/all-menu/all-menu.component';
import { CreateMenuItemComponent } from './Components/menus/create-menu-item/create-menu-item.component';
import { DeleteMenuItemComponent } from './Components/menus/delete-menu-item/delete-menu-item.component';
import { UpdateMenuItemComponent } from './Components/menus/update-menu-item/update-menu-item.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders',component: AllordersComponent},

  { path: 'menu/create', component: CreateMenuItemComponent },
  { path: 'menu/delete/:id', component: DeleteMenuItemComponent },
  { path: 'menu/:id', component: AllMenuComponent },
  { path: 'menu/update/:id', component: UpdateMenuItemComponent },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
