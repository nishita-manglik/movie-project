import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieComponent } from './movie.component';
import { MovieServiceService } from '../services/movie-service.service';
import { GenreServiceService } from '../services/genre-service.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieServiceService>;
  let genreServiceSpy: jasmine.SpyObj<GenreServiceService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieServiceService', [
      'getMovies',
      'getMoviesByName',
      'getMovieById',
      'getMoviesByGenre',
      'getMoviesByActor',
      'getMoviesByDirector'
    ]);
    genreServiceSpy = jasmine.createSpyObj('GenreServiceService', ['getGenres']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MovieComponent],
      providers: [
        { provide: MovieServiceService, useValue: movieServiceSpy },
        { provide: GenreServiceService, useValue: genreServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies and genres on init and set trending', () => {
    const movies = [
      { title: 'Movie A', imdbRating: '9.1' },
      { title: 'Movie B', imdbRating: '8.5' }
    ];
    const genres = [{ id: 1, name: 'Action' }];

    movieServiceSpy.getMovies.and.returnValue(of(movies));
    genreServiceSpy.getGenres.and.returnValue(of(genres));

    fixture.detectChanges();

    expect(component.movie_data).toEqual(movies);
    expect(component.trending_movies.length).toBe(1);
    expect(component.genre_list).toEqual(genres);
  });

  it('should search movies by name', () => {
    const results = [{ title: 'Matrix', imdbRating: '8.7' }];

    movieServiceSpy.getMoviesByName.and.returnValue(of(results));

    component.onSearch({ target: { value: 'Matrix' } } as any);
    expect(component.movie_data).toEqual(results);
    expect(component.isFilter).toBeTrue();
  });

  it('should reset movies if search input is empty', () => {
    component.movie_data_list = [{ title: 'Old Movie' }];
    component.onSearch({ target: { value: '' } } as any);
    expect(component.movie_data).toEqual(component.movie_data_list);
    expect(component.isFilter).toBeFalse();
  });

  it('should filter movies by genre', () => {
    const genreMovies = [{ title: 'Genre Movie', imdbRating: '7.5' }];
    movieServiceSpy.getMoviesByGenre.and.returnValue(of(genreMovies));

    component.onGenreChange({ target: { value: '1' } } as any);
    expect(component.movie_data).toEqual(genreMovies);
  });

  it('should reset genre filter to all movies', () => {
    component.movie_data_list = [{ title: 'All Movies' }];
    component.onGenreChange({ target: { value: '0' } } as any);
    expect(component.movie_data).toEqual(component.movie_data_list);
  });

  it('should search movies by actor', () => {
    const actorResults = [{ title: 'Actor Movie' }];
    movieServiceSpy.getMoviesByActor.and.returnValue(of(actorResults));

    component.onSearchByActor({ target: { value: 'Tom Hanks' } } as any);
    expect(component.movie_data).toEqual(actorResults);
  });

  it('should search movies by director', () => {
    const directorResults = [{ title: 'Director Movie' }];
    movieServiceSpy.getMoviesByDirector.and.returnValue(of(directorResults));

    component.onSearchByDirector({ target: { value: 'Nolan' } } as any);
    expect(component.movie_data).toEqual(directorResults);
    expect(component.isFilter).toBeTrue();

  });

  it('should navigate to movie detail', () => {
    const movie = { id: 1, title: 'Inception' };
    movieServiceSpy.getMovieById.and.returnValue(of(movie));

    component.movie_detail(1);

    expect(movieServiceSpy.getMovieById).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(
      ['movie/movie-detail'],
      { state: { id: 1, title: 'Inception' } }
    );

  });

  // Error handling tests

  it('should handle error on movie fetch', () => {
    spyOn(console, 'error');
    movieServiceSpy.getMovies.and.returnValue(throwError(() => new Error('fail')));
    genreServiceSpy.getGenres.and.returnValue(of([]));

    fixture.detectChanges();
    expect(component.movie_data).toEqual([]);
  });

  it('should handle error on genre filter', () => {
    spyOn(console, 'error');
    movieServiceSpy.getMoviesByGenre.and.returnValue(throwError(() => new Error('genre error')));

    component.onGenreChange({ target: { value: '1' } } as any);
    expect(component.movie_data).toEqual([]);
  });

  it('should handle error on actor search', () => {
    spyOn(console, 'error');
    movieServiceSpy.getMoviesByActor.and.returnValue(throwError(() => new Error('actor error')));

    component.onSearchByActor({ target: { value: 'Tom Hanks' } } as any);
    expect(component.movie_data).toEqual([]);
  });

  it('should handle error on director search', () => {
    spyOn(console, 'error');
    movieServiceSpy.getMoviesByDirector.and.returnValue(throwError(() => new Error('director error')));

    component.onSearchByDirector({ target: { value: 'Nolan' } } as any);
    expect(component.movie_data).toEqual([]);
  });

  it('should handle error on movie detail fetch', () => {
    spyOn(console, 'error');
    movieServiceSpy.getMovieById.and.returnValue(throwError(() => new Error('detail fail')));

    component.movie_detail(1);
    expect(console.error).toHaveBeenCalled();
  });
});
