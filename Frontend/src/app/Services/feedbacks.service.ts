import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
  constructor(private myClient: HttpClient) {}
  private Base_URL = 'https://homeflavor-backend.onrender.com/api/feedback';

  getAllFeedbacks(id: any) {
    return this.myClient.get(`${this.Base_URL}/${id}`);
  }

  createFeedback(newFeedback: any) {
    return this.myClient.post(`${this.Base_URL}/create`, newFeedback);
  }

  deleteFeedbackByID(id: any) {
    return this.myClient.delete(`${this.Base_URL}/${id}`);
  }
}
