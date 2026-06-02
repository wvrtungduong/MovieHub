import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() movieId!: string;
  @Output() averageChanged = new EventEmitter<number>();
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.reviews = this.reviewService.getReviewsForMovie(this.movieId);
    this.averageChanged.emit(this.reviewService.getAverageRating(this.movieId));
  }

  upvote(review: Review): void {
    if (this.reviewService.upvote(review.id)) {
      this.load();
    }
  }

  onAdded(): void {
    this.load();
  }

  hasVoted(reviewId: string): boolean {
    return this.reviewService.hasVoted(reviewId);
  }
}
