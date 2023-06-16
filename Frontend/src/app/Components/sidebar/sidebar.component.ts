import { Component } from '@angular/core';
import { BackendService } from 'src/app/Services/backend.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  user_data: any;
  constructor(
    private localStorageService: LocalStorageService,
    private myService: BackendService,
  ) {}
  ngOnInit(): void {
    this.localStorageService.getData('jwt_token').subscribe((data) => {
      this.user_data = data;
      console.log("app",this.user_data)
    });
  }
  logout() {
    // Send logout request to backend
    this.myService.userLogout({}).subscribe();
    this.localStorageService.removeData('jwt_token');
    this.localStorageService.removeData('cart');
    location.href = '/';
  }
}
