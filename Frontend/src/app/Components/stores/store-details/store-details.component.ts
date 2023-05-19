import { Component, Output, EventEmitter } from '@angular/core';
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
  menu: any;
  feedbacks: any;
  rating: number = 0;
  image_path: any;
  localhost = 'http://localhost:7005';
  @Output() addedToCart = new EventEmitter<any>();
  constructor(
    myRoute: ActivatedRoute,
    public myService: StoresService,
    public menuService: MenuService,
    public feedbackService: FeedbacksService
  ) {
    this.id = myRoute.snapshot.params['id'];
    this.myService.getStoreByID(this.id).subscribe({
      next: (data: any) => {
        this.store = data;
        console.log(this.store);
      },
      error: (err: any) => {
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

  addToCart(prod: any) {
    this.product = prod;
    console.log(this.product);
    this.addedToCart.emit(this.product);
    console.log('etba3t');
  }

  showFeedback() {
    let productSection = document.querySelector('.product-section');
    let feedbackSection = document.querySelector('.testimonail-section');
    let menuTabContainer = document.querySelector('.menuTabContainer');
    let feedbackTabContainer = document.querySelector('.feedbackTabContainer');
    productSection?.classList.remove('show');
    feedbackSection?.classList.add('show');
    menuTabContainer?.classList.remove('active');
    feedbackTabContainer?.classList.add('active');
  }

  showMenu() {
    let productSection = document.querySelector('.product-section');
    let feedbackSection = document.querySelector('.testimonail-section');
    let menuTabContainer = document.querySelector('.menuTabContainer');
    let feedbackTabContainer = document.querySelector('.feedbackTabContainer');
    productSection?.classList.add('show');
    feedbackSection?.classList.remove('show');
    menuTabContainer?.classList.add('active');
    feedbackTabContainer?.classList.remove('active');
  }

  rate(star: number) {
    this.rating = star;
    console.log(this.rating);
  }

  filterProducts(category: any) {
    let products = document.querySelectorAll('.singleProductOuterContainer');
    if (category == 'all') {
      products.forEach((product: any) => {
        let p = product as HTMLElement;

        p.style.display = 'block';
      });
      return;
    }

    products.forEach((product: any) => {
      let p = product as HTMLElement;
      p.style.display = 'none';
    });

    products.forEach((product: any) => {
      let p = product as HTMLElement;
      if (p.classList.contains(category)) {
        p.style.display = 'block';
      }
    });
  }

  addFeedback(storeID: any, userID: any, comment: any) {
    let newFeedback = {
      store_id: storeID,
      user_id: userID,
      comment: comment,
      stars: this.rating,
    };

    this.feedbackService.createFeedback(newFeedback).subscribe({
      next: (data) => {
        console.log(newFeedback);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
