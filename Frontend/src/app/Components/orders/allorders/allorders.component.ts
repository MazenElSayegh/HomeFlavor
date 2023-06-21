import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { StoresService } from 'src/app/Services/stores.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  orders: any[] = [];
  localhost = 'http://localhost:7005';
  test: any;
  user_data: any;
  storeID: any;
  noOrders: any = false;
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    ordersService.GetAllOrders().subscribe({
      next: (data: any) => {
        // To show latest orders first
        console.log(this.noOrders);
        console.log(data);
        if (data=='none' || data.length < 1) {
          this.noOrders = true;
          console.log(this.noOrders);
        } else {
          const sortedOrders = data.slice().sort((a: any, b: any) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              return 0; // return 0 to preserve the original order of the elements
            }
            return dateB.getTime() - dateA.getTime();
          });
          const filteredOrders = sortedOrders.filter((order: any) => {
            return order.store_id && order.user_id;
          });
          this.orders = filteredOrders;
          this.dtTrigger.next(null);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.localStorageService.getData('jwt_token').subscribe((data) => {
      this.user_data = data;
      this.dtOptions = {
        paging: true,
        ordering: true,
        searching: true,
      };
    });
  }

  Update(id: any, status: any, user_id: any, store_id: any, products: any) {
    let updatedOrder = { status, user_id, store_id, products };
    this.ordersService.UpdateOrderByID(id, updatedOrder).subscribe();
  }
  reload() {
    window.location.reload();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
