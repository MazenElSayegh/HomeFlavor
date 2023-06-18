import { Component } from '@angular/core';
import { BackendService } from 'src/app/Services/backend.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
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
