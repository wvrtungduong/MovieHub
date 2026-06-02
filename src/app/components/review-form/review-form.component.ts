import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() movieId!: string;
  @Output() added = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const review: Review = {
      id: Math.random().toString(36).slice(2, 9),
      movieId: this.movieId,
      author: v.author,
      rating: v.rating,
      comment: v.comment,
      upvotes: 0,
      createdAt: new Date().toISOString()
    };
    this.reviewService.addReview(review);
    this.form.reset({ author: '', rating: 5, comment: '' });
    this.added.emit();
  }

  get author() {
    return this.form.get('author');
  }

  get rating() {
    return this.form.get('rating');
  }

  get comment() {
    return this.form.get('comment');
  }
}
