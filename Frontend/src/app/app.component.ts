import { Component, Input } from '@angular/core';
import { StoreDetailsComponent } from './Components/stores/store-details/store-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home Flavor';
  addedProducts:any;
  // studentsData: {name: string , age: string}[] = []

  getData(data:any){
    if(data instanceof StoreDetailsComponent){
    const child:StoreDetailsComponent=data;
    child.addedToCart.subscribe((data)=>{
      console.log(data)
      var newProduct=data;
      // this.addedProducts.push(data)
      // console.log(this.addedProducts)
    })


    // console.log("gowa function el get Data");
    // console.log(data);
    }
    this.addedProducts.push(data);
    console.log(this.addedProducts);
  }


  handleChildChange(event: any) {
    // Handle changes from child
  }

  handleRouterActivation(component: any) {
    if (component instanceof StoreDetailsComponent) {
      console.log("gowa function el get Dataaaaaaaaaa");
    }
  }
}
