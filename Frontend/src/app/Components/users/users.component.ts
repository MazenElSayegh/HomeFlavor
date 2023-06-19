import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/Services/backend.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  users: any;
  user_data: any;
  constructor(
    private usersService: BackendService,
    private localStorageService: LocalStorageService
  ) {
    usersService.getAllUsers().subscribe({
      next: (data: any) => {
        data.sort((a: any, b: any) => a.user_name.localeCompare(b.user_name));
        this.users = data;
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
