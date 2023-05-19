import { Component,Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() addedProducts:any;
  // removeProduct(product:any){
  //   this.addedProducts.splice(product)
  // }


  removeProduct(product:any){
    let arrayOfProducts=localStorage.getItem("cart")
    if(arrayOfProducts){
      console.log("hiiiiii")
    let data=JSON.parse(arrayOfProducts)
    console.log(data)
    data.forEach( (item:any, index:any) => {
      console.log(item)
      console.log(product)
      if(item._id === product._id){
        data.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(data))
        console.log(data,"heeere")
        this.addedProducts=data
      }
    });
  }
 }

 incrementQuantity(product:any){
  let arrayOfProducts=localStorage.getItem("cart")
    if(arrayOfProducts){
      console.log("hiiiiii")
    let data=JSON.parse(arrayOfProducts)
    console.log(data)
    data.forEach( (item:any, index:any) => {
      console.log(item)
      console.log(product)
      if(item._id === product._id){
        ++data[index].quantity
        localStorage.setItem("cart",JSON.stringify(data))
        console.log(data,"heeere")
        this.addedProducts=data
      }
    });
  }
 }

 decrementQuantity(product:any){
  let arrayOfProducts=localStorage.getItem("cart")
    if(arrayOfProducts){
      console.log("hiiiiii")
    let data=JSON.parse(arrayOfProducts)
    console.log(data)
    data.forEach( (item:any, index:any) => {
      console.log(item)
      console.log(product)
      if(item._id === product._id){
        --data[index].quantity
        localStorage.setItem("cart",JSON.stringify(data))
        console.log(data,"heeere")
        this.addedProducts=data
      }
    });
  }
 }



//  ngOnInit(): void {
//   console.log(this.addedProducts)
//   if (this.addedProducts === undefined || this.addedProducts.length==0) {
//   let data=localStorage.getItem("cart")
//     if(data){

//       this.addedProducts = JSON.parse(data);
//     }
//   console.log(localStorage.getItem("cart"))
//   }
// }
}

