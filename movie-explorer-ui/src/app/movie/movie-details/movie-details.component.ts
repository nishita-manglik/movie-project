import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActorServiceService } from '../../services/actor-service.service';
import { DirectorServiceService } from '../../services/director-service.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  movie_detail: any
  genre_list: string[] = []
  language_list: string[] = []
  actors_list: any[] = []
  director_list: any
  // selectedPerson: any = {};
  movie_list: any[] = []
  selectedPerson: any = {}
  isLoading: boolean = false

  private actorService = inject(ActorServiceService);
  private directorService = inject(DirectorServiceService);
  constructor(
    private route: Router,
    private modalService: NgbModal,
    // private actorService: ActorServiceService,
    // private directorService: DirectorServiceService,
  ) {
    const abc = this.route.getCurrentNavigation();
    this.movie_detail = abc?.extras.state
    this.actors_list = this.movie_detail.actors
    this.genre_list = this.movie_detail.genre?.map((genre: any) => genre.name);
    this.language_list = this.movie_detail.language?.split(',').map((l: any) => l.trim());
    this.director_list = this.movie_detail.director

  }

  openPersonModal(id: number, type: 'actor' | 'director', personModal: any) {

    if (type == 'actor') {
      this.isLoading = true
      this.actorService.getActorById(id).subscribe({
        next: (actor: any) => {
          this.isLoading = false
          this.selectedPerson = actor;
          this.movie_list = this.selectedPerson.popular_movies.split(',').map((m: any) => m.trim());
          this.modalService.open(personModal, { backdrop: 'static' });
        },
        error: (err) => {
          this.isLoading = false
          console.error(err);
        }
      });
    }
    else {
      this.isLoading = false
      this.directorService.getDirectorById(id).subscribe({
        next: (actor: any) => {
          this.isLoading = false
          this.selectedPerson = actor;
          this.movie_list = this.selectedPerson.popular_movies.split(',').map((m: any) => m.trim());
          this.modalService.open(personModal, { backdrop: 'static' });
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false
        }
      });
    }

  }
  mainPage() {
    this.route.navigate(['/movie'])
  }
}
