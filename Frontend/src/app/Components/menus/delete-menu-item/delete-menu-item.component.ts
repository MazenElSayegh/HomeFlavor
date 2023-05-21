import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-delete-menu-item',
  templateUrl: './delete-menu-item.component.html',
  styleUrls: ['./delete-menu-item.component.css'],
})
export class DeleteMenuItemComponent {
  id: any;
  storeIDReceived: any;
  constructor(
    private myService: MenuService,
    myRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = myRoute.snapshot.params['id'];

    const previousNavigation =
      this.router.getCurrentNavigation()?.previousNavigation;

    const storeID =
      previousNavigation?.finalUrl?.root.children['primary'].segments[1].path;

    this.storeIDReceived = storeID;
    myService.deleteMenuItemByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
        setTimeout(() => {
          location.href = `/stores/${this.storeIDReceived}`;
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
