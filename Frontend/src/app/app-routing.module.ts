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
import { ProfileComponent } from './Components/profile/profile.component';
import { AllFeedbacksComponent } from './Components/feedbacks/all-feedbacks/all-feedbacks.component';
import { CreateFeedbackComponent } from './Components/feedbacks/create-feedback/create-feedback.component';
import { DeleteFeedbackComponent } from './Components/feedbacks/delete-feedback/delete-feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'orders', component: AllordersComponent },
  { path: 'stores', component: AllStoresComponent },
  { path: 'stores/create', component: CreateStoreComponent },
  { path: 'stores/update/:id', component: UpdateStoreComponent },
  { path: 'stores/delete/:id', component: DeleteStoreComponent },
  { path: 'stores/:id', component: StoreDetailsComponent },
  { path: 'feedbacks/create', component: CreateFeedbackComponent },
  { path: 'feedbacks/delete/:id', component: DeleteFeedbackComponent },
  { path: 'feedbacks/:id', component: AllFeedbacksComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
