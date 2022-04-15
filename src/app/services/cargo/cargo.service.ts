import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  url = 'http://localhost:4000/api/cargos/';
  constructor(private http: HttpClient) {}

  getCargos(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteCargo(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveCargo(cargo: Cargo): Observable<any> {
    return this.http.post(this.url, cargo);
  }

  getCargo(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editCargo(id: string, cargo: Cargo): Observable<any> {
    return this.http.put(this.url + id, cargo);
  }
}
