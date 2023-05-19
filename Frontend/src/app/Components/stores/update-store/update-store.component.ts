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
  storeImg: any;
  store: any;
  constructor(
    private myService: StoresService,
    private router: Router,
    myRoute: ActivatedRoute
  ) {
    this.id = myRoute.snapshot.params['id'];

    this.myService.getStoreByID(this.id).subscribe({
      next: (data: any) => {
        this.store = data;
        console.log(this.store);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateStore(userID: any, name: any, image: any, city: any, about: any) {
    const formData = new FormData();
    formData.append('user_id', userID);
    formData.append('name', name);
    formData.append('image', this.storeImg);
    formData.append('city', city);
    formData.append('about', about);

    this.myService.updateStoreByID(this.id, formData).subscribe({
      next: (data) => {
        console.log(formData);
        this.router.navigateByUrl('/stores');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  storeImgUpload(event: any) {
    this.storeImg = event.target.files[0];
    console.log(this.storeImg);
  }
}
