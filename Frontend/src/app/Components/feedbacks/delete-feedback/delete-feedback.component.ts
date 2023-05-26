import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbacksService } from 'src/app/Services/feedbacks.service';

@Component({
  selector: 'app-delete-feedback',
  templateUrl: './delete-feedback.component.html',
  styleUrls: ['./delete-feedback.component.css'],
})
export class DeleteFeedbackComponent {
  id: any;
  storeIDReceived: any;
  constructor(
    private myService: FeedbacksService,
    myRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = myRoute.snapshot.params['id'];

    const previousNavigation =
      this.router.getCurrentNavigation()?.previousNavigation;

    const storeID =
      previousNavigation?.finalUrl?.root.children['primary'].segments[1].path;

    this.storeIDReceived = storeID;

    myService.deleteFeedbackByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
        setTimeout(() => {
          location.href = `/stores/${this.storeIDReceived}`;
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
