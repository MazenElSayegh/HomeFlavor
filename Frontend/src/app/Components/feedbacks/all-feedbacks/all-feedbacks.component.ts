import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbacksService } from 'src/app/Services/feedbacks.service';

@Component({
  selector: 'app-all-feedbacks',
  templateUrl: './all-feedbacks.component.html',
  styleUrls: ['./all-feedbacks.component.css'],
})
export class AllFeedbacksComponent {
  id: any;
  constructor(private myService: FeedbacksService, myRoute: ActivatedRoute) {
    this.id = myRoute.snapshot.params['id'];
    myService.getAllFeedbacks(this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
