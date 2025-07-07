import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ActorServiceService } from './actor-service.service';

describe('ActorServiceService', () => {
  let service: ActorServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActorServiceService]
    });
    service = TestBed.inject(ActorServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch actor data by id', () => {
    const dummyActor = { id: 1, name: 'Robert Downey Jr.', popular_movies: 'Iron Man, Sherlock Holmes' };

    service.getActorById(1).subscribe(actor => {
      expect(actor).toEqual(dummyActor);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/actors/1/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyActor);
  });

  it('should handle http error', () => {
    const errorMessage = '404 Not Found';

    service.getActorById(999).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('http://localhost:8000/api/actors/999/');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
