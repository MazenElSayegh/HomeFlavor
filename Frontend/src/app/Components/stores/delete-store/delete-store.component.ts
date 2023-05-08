import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-delete-store',
  templateUrl: './delete-store.component.html',
  styleUrls: ['./delete-store.component.css'],
})
export class DeleteStoreComponent {
  id: any;
  constructor(private myService: StoresService, myRoute: ActivatedRoute) {
    this.id = myRoute.snapshot.params['id'];
    myService.deleteStoreByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
