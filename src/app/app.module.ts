import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

@NgModule({
	declarations: [AppComponent, MovieListComponent, MovieCardComponent, ReviewListComponent, ReviewFormComponent, MovieDetailComponent],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
