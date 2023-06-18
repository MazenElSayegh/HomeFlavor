import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { StoresService } from 'src/app/Services/stores.service';

@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.css']
})
export class AllStoresComponent {
  stores:any
  user_data:any
  constructor(private storesService: StoresService, private localStorageService: LocalStorageService){
    storesService.getAllStores().subscribe({
      next: (data: any) => {
        data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        this.stores = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.localStorageService.getData('jwt_token').subscribe((data) => {
        this.user_data = data;
    });
  }


}
