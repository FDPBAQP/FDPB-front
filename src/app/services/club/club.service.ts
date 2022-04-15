import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from 'src/app/models/Club';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  url = 'http://localhost:4000/api/clubes/';
  constructor(private http: HttpClient) {}

  getClubes(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteClub(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveClub(club: Club): Observable<any> {
    return this.http.post(this.url, club);
  }

  getClub(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editClub(id: string, club: Club): Observable<any> {
    return this.http.put(this.url + id, club);
  }
}
