import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbacksService } from 'src/app/Services/feedbacks.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css'],
})
export class CreateFeedbackComponent {
  constructor(private myService: FeedbacksService, private router: Router) {}

  addFeedback(storeID: any, userID: any, comment: any, stars: any) {
    let newFeedback = {
      store_id: storeID,
      user_id: userID,
      comment: comment,
      stars: +stars,
    };

    this.myService.createFeedback(newFeedback).subscribe({
      next: (data) => {
        console.log(newFeedback);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
