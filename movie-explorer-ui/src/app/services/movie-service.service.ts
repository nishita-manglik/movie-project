import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { base_url, getMovies, getMoviesByActor, getMoviesByDirector, getMoviesByGenre, getMoviesByName } from '../constants/app.urls';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  baseUrl = base_url;
  private http = inject(HttpClient);

  getMovies(): Observable<any> {
    return this.http.get(this.baseUrl + getMovies);
  }


  getMovieById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl + getMovies}${id}/`);
  }

  getMoviesByDirector(directorName: string): Observable<any> {
    const params = new HttpParams().set('director_name', directorName);
    return this.http.get(this.baseUrl + getMoviesByDirector, { params });
  }
  getMoviesByName(movieName: string): Observable<any> {
    const params = new HttpParams().set('movie_name', movieName);
    return this.http.get(this.baseUrl + getMoviesByName, { params });
  }

  getMoviesByGenre(genreId: number): Observable<any> {
    const params = new HttpParams().set('genre_id', genreId.toString());
    return this.http.get(this.baseUrl + getMoviesByGenre, { params });
  }

  getMoviesByActor(actorName: string): Observable<any> {
    const params = new HttpParams().set('actor_name', actorName);
    return this.http.get(this.baseUrl + getMoviesByActor, { params });
  }


}
