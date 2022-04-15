import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  url = 'http://localhost:4000/api/categorias/';
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteCategoria(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(this.url, categoria);
  }

  getCategoria(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editCategoria(id: string, categoria: Categoria): Observable<any> {
    return this.http.put(this.url + id, categoria);
  }
}
