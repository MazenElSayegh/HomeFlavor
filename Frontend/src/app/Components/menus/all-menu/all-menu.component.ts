import { Component,Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-all-menu',
  templateUrl: './all-menu.component.html',
  styleUrls: ['./all-menu.component.css']
})
export class AllMenuComponent {
  id: any;

  constructor(private myService: MenuService, myRoute: ActivatedRoute) {
    this.id = myRoute.snapshot.params['id'];
    myService.getAllMenu(this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
