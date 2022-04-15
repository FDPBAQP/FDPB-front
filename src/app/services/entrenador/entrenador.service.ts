import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrenador } from 'src/app/models/Entrenador';

@Injectable({
  providedIn: 'root',
})
export class EntrenadorService {
  url = 'http://localhost:4000/api/entrenadores/';
  constructor(private http: HttpClient) { }
  private data: any;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }

  getEntrenadores(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteEntrenador(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveEntrenador(entrenador: Entrenador): Observable<any> {
    return this.http.post(this.url, entrenador);
  }

  getEntrenador(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editEntrenador(id: string, entrenador: Entrenador): Observable<any> {
    return this.http.put(this.url + id, entrenador);
  }
}
