import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { base_url, getActorDetails } from '../constants/app.urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorServiceService {
  baseUrl = base_url;
  private http = inject(HttpClient);

  getActorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl + getActorDetails}${id}/`);
  }

}
