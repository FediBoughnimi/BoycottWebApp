import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/reviews.service'; // Import du service ReviewService
import { Review } from 'src/app/models/Review.model'; // Import du modèle Review

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  boycottReviews: Review[] = [];
  alternativeReviews: Review[] = [];

  constructor(private reviewService: ReviewService) {} // Injecter le service ReviewService

  ngOnInit(): void {
    this.fetchReviews(); // Appeler la méthode pour récupérer les avis
  }

  // Récupérer toutes les revues
  fetchReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      (data) => {
        this.reviews = data;
        this.separateReviews(); // Séparer les revues en boycott et alternative
        console.log(data);
      },
      (error) => {
        console.error('Error fetching reviews', error);
      }
    );
  }

  // Séparer les revues en boycott et alternative
  separateReviews(): void {
    this.boycottReviews = this.reviews.filter(review => review.submissionType === 'BOYCOTT'); // Les revues marquées comme 'BOYCOTT'
    this.alternativeReviews = this.reviews.filter(review => review.submissionType === 'ALTERNATIVE'); // Les revues marquées comme 'ALTERNATIVE'
  }
  deleteReview(id: string): void {
    if (!id) {
      console.error('Review ID is missing');
      return;
    }
  
    console.log('Deleting review with ID:', id); // Log to verify ID is passed correctly
  
    this.reviewService.deleteReview(id).subscribe(
      response => {
        console.log('Review deleted successfully:', response);
        window.location.reload();
        },
      error => {
        console.error('Error deleting review:', error);
      }
    );
  }
  
  
}
