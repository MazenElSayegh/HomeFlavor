import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';
import { MenuService } from 'src/app/Services/menu.service';
import { FeedbacksService } from 'src/app/Services/feedbacks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { OrdersService } from 'src/app/Services/orders.service';

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
  user_data: any;
  flag: any;
  productInCartStoreID: any;
  cart: any[] = [];
  allOrders: any;
  localhost = 'http://localhost:7005';
  @Output() addedToCart = new EventEmitter<any>();
  constructor(
    myRoute: ActivatedRoute,
    public myService: StoresService,
    public menuService: MenuService,
    public feedbackService: FeedbacksService,
    private LocalStorageService: LocalStorageService,
    private orderService: OrdersService
  ) {
    this.LocalStorageService.getData('jwt_token').subscribe((data) => {
      this.user_data = data;
      console.log(this.user_data.role);
    });
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

    this.orderService.GetAllOrders().subscribe({
      next: (data) => {
        this.allOrders = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    console.log('hiii');
    let storedCart = localStorage.getItem('cart');
    console.log(storedCart);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      if (this.cart.length > 0) {
        this.id = myRoute.snapshot.params['id'];
        console.log(this.id);

        this.cart.forEach((product) => {
          if (product.store_id == this.id) {
            this.flag = true;
            return;
          } else {
            this.flag = false;
            return;
          }
        });
      } else {
        this.flag = true;
      }
    } else {
      this.flag = true;
    }
  }

  addToCart(prod: any) {
    let storedCart = localStorage.getItem('cart');
    console.log(storedCart);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      if (this.cart.length > 0) {
        console.log(this.id);

        this.cart.forEach((product) => {
          if (product.store_id == this.id) {
            this.flag = true;
            return;
          } else {
            this.flag = false;
            return;
          }
        });
      } else {
        this.flag = true;
      }
    } else {
      this.flag = true;
    }
    if (this.flag) {
      this.product = prod;
      console.log('flaaaag:', this.flag);
      this.addedToCart.emit(this.product);
    }
    console.log(this.flag);
  }
  cancelModal() {
    this.flag = true;
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

  addFeedback(storeID: any, comment: any) {
    if (!this.validationForm.valid) {
      alert('Please Fix errors to be able to give feedback');
      return;
    }

    let newFeedback = {
      store_id: storeID,
      user_id: this.user_data.user_id,
      comment: comment,
      stars: this.rating,
    };

    this.feedbackService.createFeedback(newFeedback).subscribe({
      next: (data) => {
        console.log(newFeedback);
        this.getAllFeedbacks();

        let feedbackTextArea = document.querySelector(
          '#feedback_detail'
        ) as HTMLTextAreaElement;
        feedbackTextArea.value = '';

        this.rating = 0;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  validationForm = new FormGroup({
    comment: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300),
    ]),
  });

  get validComment() {
    return this.validationForm.controls['comment'].valid;
  }

  get checkAdminOrOwner() {
    let userData = this.user_data;
    let storeOwner = this.store.user_id._id;

    if (
      userData.role === 'admin' ||
      (userData.role == 'seller' && storeOwner == userData.user_id)
    ) {
      return true;
    } else {
      return false;
    }
  }

  get checkUserMadeOrder() {
    for (let i = 0; i < this.allOrders.length; i++) {
      if (
        this.user_data.user_id === this.allOrders[i].user_id._id &&
        this.id === this.allOrders[i].store_id._id
      ) {
        return true;
      }
    }

    return false;
  }

  getAllFeedbacks() {
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
}
