import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-update-menu-item',
  templateUrl: './update-menu-item.component.html',
  styleUrls: ['./update-menu-item.component.css']
})
export class UpdateMenuItemComponent {
  id: any;
  constructor(private myService: MenuService,private router: Router,myRoute: ActivatedRoute) {
    this.id = myRoute.snapshot.params['id'];
  }
  updateMenuItem(storeID: any, productImage: any, productTitle: any, price: any,productDetails: any){
    let newMenuItem = {
      store_id: storeID,
      product_image: productImage,
      product_title: productTitle,
      price: +price,
      product_details:productDetails
    };
    this.myService.updateItemByID(this.id,newMenuItem).subscribe({
      next: (data) => {
        console.log(newMenuItem);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
