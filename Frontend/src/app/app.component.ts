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
      console.log(data);
      interface MyData {
        price:number,
        product_details:string,
        product_image:string,
        product_title:string,
        store_id:string,
        _id:string
      }

      const myDataString = localStorage.getItem('cart');
      let myData: MyData[]

      if (myDataString) {
        myData = JSON.parse(myDataString);
        myData.push(data)
        localStorage.setItem("cart",JSON.stringify(myData))
      }else{
        myData=[]
        myData.push(data)
        localStorage.setItem("cart",JSON.stringify(myData))
      }
      console.log(localStorage.getItem('cart'))

    })
    }
  }
}
