import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbacksService } from 'src/app/Services/feedbacks.service';

@Component({
  selector: 'app-delete-feedback',
  templateUrl: './delete-feedback.component.html',
  styleUrls: ['./delete-feedback.component.css'],
})
export class DeleteFeedbackComponent {
  id: any;
  constructor(private myService: FeedbacksService, myRoute: ActivatedRoute) {
    this.id = myRoute.snapshot.params['id'];
    myService.deleteFeedbackByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
