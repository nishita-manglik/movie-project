import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    NgbModule,
    RouterModule,
    RouterOutlet,
    MovieComponent,
    MovieDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'movie-explorer-ui';


}
