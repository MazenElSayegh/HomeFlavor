import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-delete-menu-item',
  templateUrl: './delete-menu-item.component.html',
  styleUrls: ['./delete-menu-item.component.css']
})
export class DeleteMenuItemComponent {
  id: any;
  constructor(private myService: MenuService, myRoute: ActivatedRoute) {
    this.id = myRoute.snapshot.params['id'];
    myService.deleteMenuItemByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
