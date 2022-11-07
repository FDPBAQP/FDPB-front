import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Fecha } from 'src/app/functions/fecha/fecha';

@Component({
  selector: 'app-cat-crear-editar',
  templateUrl: './cat-crear-editar.component.html',
  styleUrls: ['./cat-crear-editar.component.scss'],
})
export class CatCrearEditarComponent implements OnInit {
  categoriaForm: FormGroup;
  titulo = 'Crear Categoria';
  id: string | null;
  today!: Date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _categoriaService: CategoriaService,
    private aRoute: ActivatedRoute
  ) {
    this.categoriaForm = this.fb.group({
      categoria: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.today = new Date();
  }

  ngAfterViewInit() {
    document.getElementsByTagName("input")[0].focus();
  }

  agregarCategoria() {

    if (this.categoriaForm.valid) {
      const CATEGORIA: Categoria = {
        detalle: this.categoriaForm.get('categoria')?.value,
        desde: this.categoriaForm.get('desde')?.value,
        hasta: this.categoriaForm.get('hasta')?.value,
      };

      if (this.id !== null) {
        this._categoriaService.editCategoria(this.id, CATEGORIA).subscribe(
          (data) => {
            this.toastr.success(
              'El categoria ' +
              this.categoriaForm.get('categoria')?.value +
              ' fue actualizado correctamente!',
              'Categoria actualizado!'
            );
            this.router.navigate(['/categoria']);
          },
          (error) => {
            console.log(error);
            this.categoriaForm.reset();
          }
        );
      } else {
        this._categoriaService.saveCategoria(CATEGORIA).subscribe(
          (data) => {
            this.toastr.success(
              'El categoria ' +
              this.categoriaForm.get('categoria')?.value +
              ' fue agregado correctamente!',
              'Categoria agregado!'
            );
            this.router.navigate(['/categoria']);
          },
          (error) => {
            console.log(error);
            this.categoriaForm.reset();
          }
        );
      }
    }
  }

  keytab(event: any) {
    const input = event.target.name;
    if (input != "submit") {
      const arrayInput = input.split("-");
      console.log("arrayInput", arrayInput)
      const num = parseInt(input.substring(6, 7))
      const nextInput = num + 1
      event.preventDefault();
      let element: any = document.getElementsByName("input-" + nextInput)[0];

      if (element == null) {
        if (this.categoriaForm.valid) {
          document.getElementsByName("submit")[0].focus();
        }
        else {
          document.getElementsByName("input-0")[0].focus();
        }
      }
      else {
        element.focus();
      }
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Categoria';
      this._categoriaService.getCategoria(this.id).subscribe(
        (data) => {
          this.categoriaForm.setValue({
            categoria: data.detalle,
            desde: data.desde,
            hasta: data.hasta,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  formatDate_yyyymmdd(date: any) {
    return Fecha.formatDate_yyyymmdd(date);
  }
}
