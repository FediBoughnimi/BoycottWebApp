import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Submission } from '../models/submission.model';  // Submission model

@Injectable({
  providedIn: 'root'
})
export class SomethingMissingService {

  private apiUrl = 'http://localhost:5000/api/submissions'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Submit the form data to the backend
  submitSubmission(formData: Submission): Observable<Submission> {
    // Ensure that we don't send _id with the form data (MongoDB will generate it)
    const { _id, ...submissionData } = formData;
    return this.http.post<Submission>(this.apiUrl, submissionData);
  }
}
