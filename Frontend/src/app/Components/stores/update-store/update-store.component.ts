import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-update-store',
  templateUrl: './update-store.component.html',
  styleUrls: ['./update-store.component.css'],
})
export class UpdateStoreComponent {
  id: any;
  constructor(
    private myService: StoresService,
    private router: Router,
    myRoute: ActivatedRoute
  ) {
    this.id = myRoute.snapshot.params['id'];
  }

  updateStore(userID: any, name: any, image: any, city: any) {
    let newStore = {
      user_id: userID,
      name: name,
      image: image,
      city: city,
    };

    this.myService.updateStoreByID(this.id, newStore).subscribe({
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
