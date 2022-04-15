import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Fecha } from 'src/app/functions/fecha/fecha';

@Component({
  selector: 'app-cat-ver',
  templateUrl: './cat-ver.component.html',
  styleUrls: ['./cat-ver.component.scss'],
})
export class CatVerComponent implements OnInit {
  listCategorias: Categoria[] = [];

  constructor(
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this._categoriaService.getCategorias().subscribe(
      (data) => {
        this.listCategorias = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarCategoria(id: any) {
    this._categoriaService.deleteCategoria(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Categoria eliminado');
        this.obtenerCategorias();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate_yyyymmdd(date: any) {
    return Fecha.formatDate_yyyymmdd(date);
  }
}
