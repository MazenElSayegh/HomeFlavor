import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {
  orders:any;
  localhost = 'http://localhost:7005';
  test:any;
  constructor(private ordersService:OrdersService,private usersService:BackendService,private storesService:StoresService, private router:Router){
    ordersService.GetAllOrders().subscribe(
      {
        next: (data)=>{
          this.orders=data;
        },
        error: (err)=>{console.log(err);
        }
      });

  }
  ngOnInit(): void {
    this.ordersService.GetAllOrders().subscribe(
      {
        next:(data:any)=>{
          this.orders = data;
        },
        error:(err:any)=>{console.log(err)}
      });

  }

  Update(id:any,status:any,user_id:any,store_id:any,products:any){
    let updatedStudent = {status,user_id,store_id,products};
    this.ordersService.UpdateOrderByID(id,updatedStudent).subscribe();
    alert("updated successfully");
    location.href='/orders'
  }

  // ShowOrderStatusIcon() {
  //   let actionsContainer = document.querySelector('.actionsContainer');
  //   let accepted = document.querySelector('.accepted');
  //   accepted?.classList.add('show')
  //   // let feedbackSection = document.querySelector('.testimonail-section');
  //   // let menuTabContainer = document.querySelector('.menuTabContainer');
  //   // let feedbackTabContainer = document.querySelector('.feedbackTabContainer');
  //   actionsContainer?.classList.remove('show');
  //   actionsContainer?.classList.add('hide');
  //   // feedbackSection?.classList.add('show');
  //   // menuTabContainer?.classList.remove('active');
  //   // feedbackTabContainer?.classList.add('active');
  // }

}
