import { Component,OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { StoresService } from 'src/app/Services/stores.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-stores',
  templateUrl: './all-stores.component.html',
  styleUrls: ['./all-stores.component.css']
})
export class AllStoresComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  stores:any
  user_data:any
  constructor(private storesService: StoresService, private localStorageService: LocalStorageService){
    storesService.getAllStores().subscribe({
      next: (data: any) => {
        data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        this.stores = data;
        this.dtTrigger.next(null);
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
    this.dtOptions = {
      paging: true,
    ordering: true,
    searching: true
    };

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
