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

  AddStore(
    userID: any,
    name: any,
    image: any,
    city: any,
    product_image: any,
    product_title: any,
    price: any,
    product_details: any,
    fbUserID: any,
    comment: any,
    date: any,
    stars: any
  ) {
    let newStore = {
      user_id: userID,
      menu: [
        {
          product_image: product_image,
          product_title: product_title,
          price: +price,
          product_details: product_details,
        },
        {
          product_image: product_image,
          product_title: product_title,
          price: +price,
          product_details: product_details,
        },
      ],
      feedback: [
        {
          user_id: fbUserID,
          comment: comment,
          date: date,
          stars: +stars,
        },
        {
          user_id: fbUserID,
          comment: comment,
          date: date,
          stars: +stars,
        },
      ],
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
