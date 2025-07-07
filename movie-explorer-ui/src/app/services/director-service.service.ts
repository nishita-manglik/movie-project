import { Injectable, inject } from '@angular/core';
import { base_url, getDirectorDetails } from '../constants/app.urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorServiceService {

  baseUrl = base_url;
  private http = inject(HttpClient);

  getDirectorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl + getDirectorDetails}${id}/`);
  }
}
