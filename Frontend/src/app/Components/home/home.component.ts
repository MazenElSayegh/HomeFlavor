import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { StoresService } from 'src/app/Services/stores.service';

interface Store {
  _id: string;
  user_id: string;
  name: string;
 image: string;
  city: string;
  about: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchTerm:any;
  stores: any=[]
  displayedStores: any = this.stores;
  localhost = 'http://localhost:7005';
  user_data: any;
  storeFlag = 1;
  constructor(
    private storesService: StoresService,
    private localStorageService: LocalStorageService,
    private ordersService: OrdersService
  ) {
    storesService.getAllStores().subscribe({
      next: (data) => {
        this.stores = data;
        this.displayedStores=data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    ordersService.GetAllOrders().subscribe({
      next: (data) => {
        if (data == 'none') {
          this.storeFlag = 0;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.localStorageService.getData('jwt_token').subscribe((data) => {
      if (data) {
        this.user_data = data;
      }
    });
  }
  filterStores(): void {
    if (!this.searchTerm) {
      // If the search term is empty, display all stores
      this.displayedStores = this.stores;
    } else {
      // Filter stores by name
      this.displayedStores = this.stores.filter((store:Store) =>
        store.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  onLinkClick(e: any) {
    e.preventDefault();
  }
}
