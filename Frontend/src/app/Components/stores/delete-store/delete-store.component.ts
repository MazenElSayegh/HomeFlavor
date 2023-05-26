import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-delete-store',
  templateUrl: './delete-store.component.html',
  styleUrls: ['./delete-store.component.css'],
})
export class DeleteStoreComponent {
  id: any;
  constructor(
    private myService: StoresService,
    myRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = myRoute.snapshot.params['id'];
    myService.deleteStoreByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
        setTimeout(() => {
          location.href = '/';
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
