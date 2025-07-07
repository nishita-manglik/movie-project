import { Component, OnInit, inject } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieServiceService } from '../services/movie-service.service';
import { GenreServiceService } from '../services/genre-service.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    NgbModule
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit {
  isLoading: boolean = false
  isFilter: boolean = false
  title = 'movie-explorer-ui';
  trending_movies: any[] = []
  search_value: string | null = null
  selectedGenre: string = '0'
  searchedActor: string | null = null
  searchedDirector: string | null = null
  searchedMovie: string | null = null
  genre_list: any[] = []
  movie_data: any[] = []
  movie_data_list: any[] = []
  private moviesService = inject(MovieServiceService);
  private genreService = inject(GenreServiceService);
  constructor(
    private modalService: NgbModal,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.getDataMovie()
    this.fetch_genre()
  }

  getDataMovie() {
    this.isLoading = true
    this.moviesService.getMovies().subscribe({
      next: (movie: any) => {

        this.movie_data = movie;
        this.movie_data_list = this.movie_data;
        this.trending_movies = this.movie_data.filter(m => parseFloat(m.imdbRating) >= 9.0);
        this.isLoading = false
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.isLoading = false
        this.movie_data = []
      }
    });
  }

  openModal(template: any) {
    this.modalService.open(template);
  }

  onSearch(event: any) {
    this.isFilter = true
    const inputElement = event.target as HTMLInputElement;
    this.search_value = inputElement.value;
    this.selectedGenre = '0'
    this.searchedActor = ''
    this.searchedDirector = ''
    this.searchedMovie = this.search_value
    if (this.search_value == '') {
      this.movie_data = this.movie_data_list;
      this.search_value = null
      this.isFilter = false
    } else {
      this.isLoading = true
      this.moviesService.getMoviesByName(this.search_value).subscribe({
        next: (movie: any) => {
          this.movie_data = movie
          this.isLoading = false
        },
        error: (err) => {
          console.error('Error fetching movies by name:', err);
          this.movie_data = []
          this.isLoading = false
        }
      });
    }


  }

  movie_detail(id: any) {
    this.isLoading = true
    this.moviesService.getMovieById(id).subscribe({
      next: (movie: any) => {
        this.isLoading = false
        this.route.navigate(['movie/movie-detail'], { state: movie });
      },
      error: (err) => {
        this.isLoading = false
        console.error('Error fetching movies by id:', err);
      }
    });
  }

  fetch_genre() {
    const genreSet = new Set<string>();
    this.isLoading = true
    this.genreService.getGenres().subscribe((genres: any) => {
      this.genre_list = genres
      this.isLoading = false
    });
  }

  onGenreChange(event: Event): void {

    this.isFilter = true
    const selected = (event.target as HTMLSelectElement).value;
    this.selectedGenre = selected;
    this.searchedActor = ''
    this.searchedDirector = ''
    this.searchedMovie = ''
    if (this.selectedGenre === '0') {
      this.isFilter = false
      this.movie_data = [...this.movie_data_list]; // All movies
    } else {
      this.isLoading = true
      this.moviesService.getMoviesByGenre(Number(this.selectedGenre)).subscribe({
        next: (movie: any) => {
          this.movie_data = movie
          this.isLoading = false
        },
        error: (err) => {
          console.error('Error fetching movies by genre:', err);
          this.isLoading = false
          this.movie_data = []
        }
      });
    }
  }

  onSearchByActor(event: Event): void {
    this.isFilter = true
    const input = event.target as HTMLInputElement;
    this.search_value = input.value.toLowerCase();
    this.selectedGenre = '0';
    this.searchedActor = this.search_value
    this.searchedDirector = ''
    this.searchedMovie = ''
    if (this.search_value.trim() === '') {
      this.isFilter = false
      this.movie_data = [...this.movie_data_list];
    } else {
      this.isLoading = true
      this.moviesService.getMoviesByActor(this.search_value).subscribe({
        next: (movie: any) => {
          this.movie_data = movie
          this.isLoading = false
        },
        error: (err) => {
          console.error('Error fetching movies by actor:', err);
          this.movie_data = []
          this.isLoading = false
        }
      });
    }
  }



  onSearchByDirector(event: Event): void {
    this.isFilter = true
    const input = event.target as HTMLInputElement;
    this.search_value = input.value.toLowerCase();
    this.selectedGenre = '0';
    this.searchedActor = ''
    this.searchedDirector = this.search_value
    this.searchedMovie = ''
    if (this.search_value.trim() === '') {
      this.isFilter = false
      this.movie_data = [...this.movie_data_list];
    } else {
      this.isLoading = true
      this.moviesService.getMoviesByDirector(this.search_value).subscribe({
        next: (movie: any) => {
          this.movie_data = movie
          this.isLoading = false
        },
        error: (err) => {
          console.error('Error fetching movies by director:', err);
          this.movie_data = []
          this.isLoading = false
        }
      });
    }
  }


}
