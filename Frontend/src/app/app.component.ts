import { Component, Input } from '@angular/core';
import { StoreDetailsComponent } from './Components/stores/store-details/store-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home Flavor';
  addedProducts: any[] = [];

  getData(data:any){
    if(data instanceof StoreDetailsComponent){
    const child:StoreDetailsComponent=data;
    child.addedToCart.subscribe((data)=>{
      this.addedProducts.push(data);
    })
    }
  }
}
