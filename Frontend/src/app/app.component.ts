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
  constructor(){
    interface MyData {
      price:number,
      product_details:string,
      product_image:string,
      product_title:string,
      store_id:string,
      _id:string,
      quantity:number
    }

    const myDataString = localStorage.getItem('cart');
    let myData: MyData[]


    if (myDataString) {
      myData = JSON.parse(myDataString);
      this.addedProducts=myData;
    }else{
      myData=[]
      this.addedProducts=myData;
    }

  }
  getData(data:any){
    if(data instanceof StoreDetailsComponent){
    const child:StoreDetailsComponent=data;
    child.addedToCart.subscribe((data)=>{
      data.quantity=1

      console.log(data);
      interface MyData {
        price:number,
        product_details:string,
        product_image:string,
        product_title:string,
        store_id:string,
        _id:string,
        quantity:number
      }

      const myDataString = localStorage.getItem('cart');
      let myData: MyData[]


      if (myDataString) {
        myData = JSON.parse(myDataString);
        myData.push(data)
        this.addedProducts=myData;
        localStorage.setItem("cart",JSON.stringify(myData))
      }else{
        myData=[]
        myData.push(data)
        this.addedProducts=myData;
        localStorage.setItem("cart",JSON.stringify(myData))
      }
      console.log(localStorage.getItem('cart'))
      console.log(this.addedProducts)

    })
    }
  }
}
