import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  ID: any;
  user: any;
  image_path: any;
  localhost = 'http://localhost:7005';

  constructor(
    public myRoute: ActivatedRoute,
    public myService: BackendService
  ) {
    this.ID = myRoute.snapshot.params['id'];
    const myData = localStorage.getItem('jwt_token');
    console.log(myData);
  }
  ngOnInit(): void {
    this.myService.getUserByID(this.ID).subscribe({
      next: (data) => {
        this.user = data;
        this.image_path = `http://localhost:7005${this.user.user_image}`;
        console.log(data);
        console.log(this.image_path);
        // localStorage.setItem('omar', 'hi');

        // const myData = localStorage.getItem('omar');
        // const myData2 = localStorage.getItem('jwt_token');
        // console.log(myData);
        // console.log(myData2);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
