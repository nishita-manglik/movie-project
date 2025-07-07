import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieServiceService } from './movie-service.service';
import { base_url, getMovies, getMoviesByActor, getMoviesByDirector, getMoviesByGenre, getMoviesByName } from '../constants/app.urls';

describe('MovieServiceService', () => {
  let service: MovieServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieServiceService]
    });
    service = TestBed.inject(MovieServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all movies', () => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(base_url + getMovies);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should fetch movie by id', () => {
    const mockMovie = { id: 1, title: 'Movie 1' };
    const movieId = 1;

    service.getMovieById(movieId).subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(`${base_url + getMovies}${movieId}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  it('should fetch movies by director name', () => {
    const mockMovies = [{ id: 1, title: 'Director Movie 1' }];
    const directorName = 'Steven Spielberg';

    service.getMoviesByDirector(directorName).subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(req => 
      req.url === base_url + getMoviesByDirector &&
      req.params.has('director_name') &&
      req.params.get('director_name') === directorName
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should fetch movies by movie name', () => {
    const mockMovies = [{ id: 1, title: 'Some Movie' }];
    const movieName = 'Some Movie';

    service.getMoviesByName(movieName).subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(req =>
      req.url === base_url + getMoviesByName &&
      req.params.has('movie_name') &&
      req.params.get('movie_name') === movieName
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should fetch movies by genre id', () => {
    const mockMovies = [{ id: 1, title: 'Genre Movie 1' }];
    const genreId = 5;

    service.getMoviesByGenre(genreId).subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(req =>
      req.url === base_url + getMoviesByGenre &&
      req.params.has('genre_id') &&
      req.params.get('genre_id') === genreId.toString()
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should fetch movies by actor name', () => {
    const mockMovies = [{ id: 1, title: 'Actor Movie 1' }];
    const actorName = 'Tom Hanks';

    service.getMoviesByActor(actorName).subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(req =>
      req.url === base_url + getMoviesByActor &&
      req.params.has('actor_name') &&
      req.params.get('actor_name') === actorName
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});
