import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent {
  constructor(private myService: StoresService, private router: Router) {}

  AddStore(userID: any, name: any, image: any, city: any) {
    let newStore = {
      user_id: userID,
      name: name,
      image: image,
      city: city,
    };

    this.myService.createStore(newStore).subscribe({
      next: (data) => {
        console.log(newStore);
        this.router.navigateByUrl('/stores');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
