import { Component } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {
  orders:any;
  constructor(private myService:OrdersService){
    console.log("HENA",myService.GetAllOrders().subscribe());
    myService.GetAllOrders().subscribe(
      {
        next: (data)=>{
          console.log(data);
          this.orders=data;
        },
        error: (err)=>{console.log(err);
        }
      });

  }
  ngOnInit(): void {
    this.myService.GetAllOrders().subscribe(
      {
        next:(data:any)=>{
          this.orders = data;
        },
        error:(err:any)=>{console.log(err)}
      });

  }

  Update(id:any,status:any){
    let updatedStudent = {status};
    console.log(updatedStudent);
    console.log(this.orders);
    this.myService.UpdateOrderByID(id,updatedStudent).subscribe(data=>console.log(data));
    alert("updated successfully");

  }
}
