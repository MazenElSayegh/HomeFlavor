import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { StoresService } from 'src/app/Services/stores.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent {
  orders: any[] = [];
  localhost = 'http://localhost:7005';
  test: any;
  user_data: any;
  storeID: any;
  constructor(
    private ordersService: OrdersService,
    private usersService: BackendService,
    private storesService: StoresService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    storesService.getAllStores().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    ordersService.GetAllOrders().subscribe({
      next: (data: any) => {
        console.log(data);
        // To show latest orders first
        const sortedOrders = data.slice().sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0; // return 0 to preserve the original order of the elements
          }
          return dateB.getTime() - dateA.getTime();
        });
        this.orders = sortedOrders;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.localStorageService.getData('jwt_token').subscribe((data) => {
      console.log(data.role, "user's Role");
      this.user_data = data;
    });
    console.log(this.user_data);
  }

  Update(id: any, status: any, user_id: any, store_id: any, products: any) {
    let updatedOrder = { status, user_id, store_id, products };
    this.ordersService.UpdateOrderByID(id, updatedOrder).subscribe();
  }
  reload() {
    window.location.reload();
  }
}
