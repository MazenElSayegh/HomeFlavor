import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private myService: BackendService, public myRouter: Router) {}

  add(
    user_name: any,
    email: any,
    password: any,
    gender: any,
    role: any,
    user_image: any
  ) {
    let newUser = { user_name, email, password, gender, role, user_image };

    this.myService.addNewUser(newUser).subscribe();

    alert('added successfully');
    this.myRouter.navigateByUrl('/');
  }
}
