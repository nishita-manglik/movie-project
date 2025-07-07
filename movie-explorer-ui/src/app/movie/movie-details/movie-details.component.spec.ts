import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActorServiceService } from '../../services/actor-service.service';
import { DirectorServiceService } from '../../services/director-service.service';
import { of, throwError } from 'rxjs';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let actorServiceSpy: jasmine.SpyObj<ActorServiceService>;
  let directorServiceSpy: jasmine.SpyObj<DirectorServiceService>;

  const mockMovieDetail = {
    actors: [{ id: 1, name: 'Actor 1' }],
    genre: [{ name: 'Action' }, { name: 'Drama' }],
    language: 'English, French',
    director: { id: 10, name: 'Director 1' },
    poster: 'poster.jpg',
    title: 'Test Movie',
    year: '2022',
    imdbRating: '8.5',
    plot: 'Test plot',
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation', 'navigate']);
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);
    actorServiceSpy = jasmine.createSpyObj('ActorServiceService', ['getActorById']);
    directorServiceSpy = jasmine.createSpyObj('DirectorServiceService', ['getDirectorById']);

    routerSpy.getCurrentNavigation.and.returnValue({ extras: mockMovieDetail } as any);



    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent, NgbModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
        { provide: ActorServiceService, useValue: actorServiceSpy },
        { provide: DirectorServiceService, useValue: directorServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and initialize values from router extras', () => {
    expect(component).toBeTruthy();
    expect(component.movie_detail).toEqual(mockMovieDetail);
    expect(component.actors_list).toEqual(mockMovieDetail.actors);
    expect(component.genre_list).toEqual(['Action', 'Drama']);
    expect(component.language_list).toEqual(['English', 'French']);
    expect(component.director_list).toEqual(mockMovieDetail.director);
  });

  it('should navigate back to /movie on mainPage call', () => {
    component.mainPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie']);
  });

  describe('openPersonModal', () => {
    const personModalRef = { result: Promise.resolve('close') };

    it('should open actor modal and load actor data', fakeAsync(() => {
      const mockActor = {
        id: 1,
        name: 'Actor 1',
        popular_movies: 'Movie A, Movie B',
        birth: { date: '1980-01-01', place: 'USA' },
        description: 'Actor description',
      };
      actorServiceSpy.getActorById.and.returnValue(of(mockActor));
      modalServiceSpy.open.and.returnValue(personModalRef as any);

      component.openPersonModal(1, 'actor', 'personModal');

      tick(); // simulate async

      expect(component.isLoading).toBeFalse();
      expect(component.selectedPerson).toEqual(mockActor);
      expect(component.movie_list).toEqual(['Movie A', 'Movie B']);
      expect(modalServiceSpy.open).toHaveBeenCalledWith('personModal', { backdrop: 'static' });
    }));

    it('should handle actor service error gracefully', fakeAsync(() => {
      actorServiceSpy.getActorById.and.returnValue(throwError(() => new Error('Actor error')));

      spyOn(console, 'error');

      component.openPersonModal(1, 'actor', 'personModal');

      tick();

      expect(component.isLoading).toBeFalse();
      expect(console.error).toHaveBeenCalled();
      expect(modalServiceSpy.open).not.toHaveBeenCalled();
    }));

    it('should open director modal and load director data', fakeAsync(() => {
      const mockDirector = {
        id: 10,
        name: 'Director 1',
        popular_movies: 'Dir Movie A, Dir Movie B',
        birth: { date: '1970-01-01', place: 'UK' },
        description: 'Director description',
      };
      directorServiceSpy.getDirectorById.and.returnValue(of(mockDirector));
      modalServiceSpy.open.and.returnValue(personModalRef as any);

      component.openPersonModal(10, 'director', 'personModal');

      tick();

      expect(component.isLoading).toBeFalse();
      expect(component.selectedPerson).toEqual(mockDirector);
      expect(component.movie_list).toEqual(['Dir Movie A', 'Dir Movie B']);
      expect(modalServiceSpy.open).toHaveBeenCalledWith('personModal', { backdrop: 'static' });
    }));

    it('should handle director service error gracefully', fakeAsync(() => {
      directorServiceSpy.getDirectorById.and.returnValue(throwError(() => new Error('Director error')));

      spyOn(console, 'error');

      component.openPersonModal(10, 'director', 'personModal');

      tick();

      expect(component.isLoading).toBeFalse();
      expect(console.error).toHaveBeenCalled();
      expect(modalServiceSpy.open).not.toHaveBeenCalled();
    }));
  });
});
