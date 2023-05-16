import { Component, Input } from '@angular/core';

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
  console.log("gowa function el get Data");
  console.log(data);
  this.addedProducts.push(data);
  console.log(this.addedProducts);
}
}
