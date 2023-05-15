import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Output() addedToCartfoot = new EventEmitter<any>();
  addToCart(){
    console.log("lsa mtba3tsh ");
    this.addedToCartfoot.emit("hiiii from footer");
    console.log("etba3t");
  }

}
