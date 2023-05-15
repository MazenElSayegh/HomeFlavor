import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent {
  storeImg: any;
  constructor(private myService: StoresService, private router: Router) {}

  AddStore(userID: any, name: any, image: any, city: any) {
    const formData = new FormData();
    formData.append('user_id', userID);
    formData.append('name', name);
    formData.append('image', this.storeImg);
    formData.append('city', city);
    // let newStore = {
    //   user_id: userID,
    //   name: name,
    //   image: image,
    //   city: city,
    // };

    this.myService.createStore(formData).subscribe({
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
