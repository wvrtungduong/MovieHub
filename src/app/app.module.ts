import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
	declarations: [AppComponent, MovieListComponent, MovieCardComponent],
	imports: [BrowserModule, AppRoutingModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
