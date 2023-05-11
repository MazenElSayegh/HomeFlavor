import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css'],
})
export class StoreDetailsComponent {
  id: any;
  store: any;
  constructor(myRoute: ActivatedRoute, public myService: StoresService) {
    this.id = myRoute.snapshot.params['id'];
    this.myService.getStoreByID(this.id).subscribe({
      next: (data) => {
        this.store = data;
        console.log(this.store);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
