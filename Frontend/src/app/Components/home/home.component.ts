import { Component } from '@angular/core';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  stores:any;
  localhost="http://localhost:7005";
  constructor(private myService: StoresService) {
    myService.getAllStores().subscribe({
      next: (data) => {
        this.stores=data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onLinkClick(e:any){
    e.preventDefault()
  }
}
