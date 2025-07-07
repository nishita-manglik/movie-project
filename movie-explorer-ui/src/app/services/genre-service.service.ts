import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { base_url, getGenreDetails } from '../constants/app.urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {

  baseUrl = base_url;
  private http = inject(HttpClient);

  // Fetch all genres
  getGenres(): Observable<any> {
    return this.http.get(this.baseUrl + getGenreDetails);
  }

}
