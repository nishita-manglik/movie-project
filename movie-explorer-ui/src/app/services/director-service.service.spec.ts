import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DirectorServiceService } from './director-service.service';

describe('DirectorServiceService', () => {
  let service: DirectorServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DirectorServiceService]
    });

    service = TestBed.inject(DirectorServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch director data by id', () => {
    const dummyDirector = { id: 1, name: 'Christopher Nolan', popular_movies: 'Inception, Dunkirk' };

    service.getDirectorById(1).subscribe(director => {
      expect(director).toEqual(dummyDirector);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/directors/1/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyDirector);
  });

  it('should handle http error', () => {
    const errorMessage = '404 Not Found';

    service.getDirectorById(999).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('http://localhost:8000/api/directors/999/');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
