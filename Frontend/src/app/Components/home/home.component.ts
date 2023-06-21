import { Component,OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { StoresService } from 'src/app/Services/stores.service';
import { RouteReuseStrategy } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';

interface Store {
  _id: string;
  user_id: string;
  name: string;
 image: string;
  city: string;
  about: string;
}

interface User {

_id:string,
user_name:"string",
email:"string",
password:"string",
user_image:"string",
gender:"string",
role:"string",
mobile:"string",
address:"string",
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

  ordersChartOptions = {
    title: {
      text: "Users with most orders"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "",  y: 0 },
      ]
    }]
  };
  searchTerm:any;
  users:any=[]
  stores: any=[]
  orders:any=[]
  displayedStores: any = this.stores;
  localhost = 'http://localhost:7005';
  user_data: any;
  storeFlag = 1;
  timeout:any = null;
  usersTimeout:any = null;
  chart: any;
  usersChart:any;
  arrayCounts:any=[];
  usersArrayCounts:any=[];
  constructor(
    private storesService: StoresService,
    private localStorageService: LocalStorageService,
    private ordersService: OrdersService,
    private backendService: BackendService
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

    backendService.getAllUsers().subscribe({
      next: (data) => {
        this.users= data;
        console.log(this.users)
      },
      error: (err) => {
        console.log(err);
      },
    });
    ordersService.GetAllOrders().subscribe({
      next: (data) => {
        this.orders=data;
        for (let i = 0; i < this.stores.length; i++) {

          let count =0

          const filteredArray = this.orders.filter((order:Order) => order.store_id && (order.store_id._id === this.stores[i]._id));
          count = filteredArray.length;
            this.arrayCounts.push({"name":this.stores[i].name,"count":count})
        }

        for (let i = 0; i < this.users.length; i++) {

          let countUsers =0

          const filteredUsersArray = this.orders.filter((order:Order) => order.user_id && (order.user_id._id === this.users[i]._id));
          countUsers = filteredUsersArray.length;
            this.usersArrayCounts.push({"name":this.users[i].user_name,"count":countUsers})
            console.log("heere",this.usersArrayCounts)
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
  ordersGetChartInstance(chart: object) {
    this.usersChart = chart;
    this.updateOrdersChart();
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

  updateOrdersChart = () => {
    const sortedArray = this.usersArrayCounts.sort((a:any, b:any) => b.count - a.count);
    this.usersArrayCounts=sortedArray
    for (let i = 0; i < 5; i++) {
        if(this.usersArrayCounts[i]){
          this.ordersChartOptions.data[0].dataPoints[i]={label:this.usersArrayCounts[i].name, y:this.usersArrayCounts[i].count}
        }
    }
    this.usersChart.render();

    this.usersTimeout = setTimeout(this.updateOrdersChart, 1000);
  };
}
