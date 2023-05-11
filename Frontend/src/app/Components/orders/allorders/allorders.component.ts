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

  Update(id:any,status:any){
    let updatedStudent = {status};
    this.ordersService.UpdateOrderByID(id,updatedStudent).subscribe();
    alert("updated successfully");
    this.router.navigateByUrl('/orders');
  }

}
