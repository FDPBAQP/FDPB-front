import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Entrenador } from 'src/app/models/Entrenador';
import { ClubService } from 'src/app/services/club/club.service';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador.service';

@Component({
  selector: 'app-ent-ver',
  templateUrl: './ent-ver.component.html',
  styleUrls: ['./ent-ver.component.scss'],
})
export class EntVerComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  maxSize: number = 5;
  listEntrenadores: Entrenador[] = [];
  listFiltered: Entrenador[] = [];

  constructor(
    private _entrenadorService: EntrenadorService,
    private _clubService: ClubService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.obtenerEntrenadores();
  }

  obtenerEntrenadores() {
    this._entrenadorService.getEntrenadores().subscribe(
      (data) => {
        this.listEntrenadores = data;
        this.listFiltered = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarEntrenador(id: any) {
    this._entrenadorService.deleteEntrenador(id).subscribe(
      (data) => {
        this.toastr.error(
          'Datos borrados exitosamente',
          'Entrenador eliminado'
        );
        this.obtenerEntrenadores();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterSelect(item: any) {
    this.listFiltered = this.listEntrenadores.filter(t => t.filter?.includes(item.filter.toUpperCase()));
  }

  filterCleared() {
    this.listFiltered = this.listEntrenadores
  }

  filterChange(item: any) {
    let filter = item.target.value
    if (filter == "") {
      this.listFiltered = this.listEntrenadores
    } else {
      this.listFiltered = this.listEntrenadores.filter(t => t.filter?.includes(filter.toUpperCase()));
    }
  }
}
