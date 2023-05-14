import { Component,Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';
import { MenuService } from 'src/app/Services/menu.service';
import { FeedbacksService } from 'src/app/Services/feedbacks.service';


@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css'],
})
export class StoreDetailsComponent {
  id: any;
  store: any;
  product: any;
  menu:any;
  feedbacks:any;
  @Output() addedToCart = new EventEmitter<any>();
  constructor(myRoute: ActivatedRoute, public myService: StoresService, public menuService: MenuService, public feedbackService: FeedbacksService) {
    this.id = myRoute.snapshot.params['id'];
    this.myService.getStoreByID(this.id).subscribe({
      next: (data) => {
        this.store = data;
        // console.log(this.store);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.menuService.getAllMenu(this.id).subscribe({
      next: (data) => {
        this.menu = data;
        // console.log(this.menu);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.feedbackService.getAllFeedbacks(this.id).subscribe({
      next: (data) => {
        this.feedbacks = data;
        // console.log(this.feedbacks);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(prod:any){
    this.product=prod;
    console.log(this.product);
    this.addedToCart.emit(this.product);
  }
}
