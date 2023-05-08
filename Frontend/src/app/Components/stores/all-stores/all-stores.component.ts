import { Component } from '@angular/core';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.css'],
})
export class AllStoresComponent {
  constructor(private myService: StoresService) {
    myService.getAllStores().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
