import { Component } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css'],
})
export class OrderdetailsComponent {
  id: any;
  order: any;
  constructor(
    myRoute: ActivatedRoute,
    public myService: OrdersService,
    private router: Router
  ) {
    this.id = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.myService.GetOrderByID(this.id).subscribe({
      next: (data) => {
        this.order = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
