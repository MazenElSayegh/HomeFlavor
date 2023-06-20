import { Component,OnDestroy } from '@angular/core';
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

interface Order {
  _id: string;
  user_id: any;
 store_id: any;
 status: string;
  products:any[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  chartOptions = {
    title: {
      text: "Stores with most orders"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "",  y: 0 },
      ]
    }]
  };
  searchTerm:any;
  stores: any=[]
  orders:any=[]
  displayedStores: any = this.stores;
  localhost = 'http://localhost:7005';
  user_data: any;
  storeFlag = 1;
  timeout:any = null;
  chart: any;
  arrayCounts:any=[];
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
        this.orders=data;
        console.log(this.orders)
        console.log(this.stores)
        for (let i = 0; i < this.stores.length; i++) {

          let count =0

          const filteredArray = this.orders.filter((order:Order) => order.store_id && (order.store_id._id === this.stores[i]._id));
          count = filteredArray.length;
            this.arrayCounts.push({"name":this.stores[i].name,"count":count})
        }

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
    console.log("ok")
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
  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateChart();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  updateChart = () => {
    const sortedArray = this.arrayCounts.sort((a:any, b:any) => b.count - a.count);
    this.arrayCounts=sortedArray
    for (let i = 0; i < 5; i++) {
        if(this.arrayCounts[i]){
          this.chartOptions.data[0].dataPoints[i]={label:this.arrayCounts[i].name, y:this.arrayCounts[i].count}
        }
    }
    this.chart.render();

    this.timeout = setTimeout(this.updateChart, 1000);
  };
}
