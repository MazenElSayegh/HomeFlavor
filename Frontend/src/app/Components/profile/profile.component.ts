import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ID: any;
  user: any;

  constructor(public myRoute: ActivatedRoute,public myService: BackendService){
    this.ID = myRoute.snapshot.params['id'];

  }
  ngOnInit(): void {
    this.myService.getUserByID(this.ID).subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }



}
