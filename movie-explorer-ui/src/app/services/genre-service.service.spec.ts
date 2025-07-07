import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenreServiceService } from './genre-service.service';
import { getGenreDetails } from '../constants/app.urls';

describe('GenreServiceService', () => {
  let service: GenreServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenreServiceService]
    });
    service = TestBed.inject(GenreServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch genres', () => {
    const mockGenres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' }
    ];

    service.getGenres().subscribe(genres => {
      expect(genres).toEqual(mockGenres);
    });

    const req = httpMock.expectOne(service.baseUrl + getGenreDetails);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenres);
  });
});
