import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorComponent } from './Components/error/error.component';
import { AllordersComponent } from './Components/orders/allorders/allorders.component';
import { CreateorderComponent } from './Components/orders/createorder/createorder.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { OrderdetailsComponent } from './Components/orders/orderdetails/orderdetails.component';
import { AllStoresComponent } from './Components/stores/all-stores/all-stores.component';
import { StoreDetailsComponent } from './Components/stores/store-details/store-details.component';
import { CreateStoreComponent } from './Components/stores/create-store/create-store.component';
import { UpdateStoreComponent } from './Components/stores/update-store/update-store.component';
import { DeleteStoreComponent } from './Components/stores/delete-store/delete-store.component';
import { AllFeedbacksComponent } from './Components/feedbacks/all-feedbacks/all-feedbacks.component';
import { CreateFeedbackComponent } from './Components/feedbacks/create-feedback/create-feedback.component';
import { DeleteFeedbackComponent } from './Components/feedbacks/delete-feedback/delete-feedback.component';
import { AllMenuComponent } from './Components/menus/all-menu/all-menu.component';
import { CreateMenuItemComponent } from './Components/menus/create-menu-item/create-menu-item.component';
import { DeleteMenuItemComponent } from './Components/menus/delete-menu-item/delete-menu-item.component';
import { UpdateMenuItemComponent } from './Components/menus/update-menu-item/update-menu-item.component';
import { ProfileComponent } from './Components/profile/profile/profile.component';
import { UpdateProfileComponent } from './Components/profile/update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent,
    AllordersComponent,
    CreateorderComponent,
    OrderdetailsComponent,
    AllStoresComponent,
    StoreDetailsComponent,
    CreateStoreComponent,
    UpdateStoreComponent,
    DeleteStoreComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,
    AllFeedbacksComponent,
    CreateFeedbackComponent,
    DeleteFeedbackComponent,
    AllMenuComponent,
    CreateMenuItemComponent,
    DeleteMenuItemComponent,
    UpdateMenuItemComponent,
    UpdateProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
