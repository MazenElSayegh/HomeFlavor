import { Component,Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() addedProducts:any;
  constructor(){
    console.log(this.addedProducts);

  }
  test(){
    console.log(this.addedProducts);
  }
}
