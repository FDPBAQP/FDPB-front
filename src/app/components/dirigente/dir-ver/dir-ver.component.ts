import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dirigente } from 'src/app/models/Dirigente';
import { ClubService } from 'src/app/services/club/club.service';
import { DirigenteService } from 'src/app/services/dirigente/dirigente.service';

@Component({
  selector: 'app-dir-ver',
  templateUrl: './dir-ver.component.html',
  styleUrls: ['./dir-ver.component.scss'],
})
export class DirVerComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  maxSize: number = 5;
  listDirigentes: Dirigente[] = [];
  listFiltered: Dirigente[] = [];

  constructor(
    private _dirigenteService: DirigenteService,
    private _clubService: ClubService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.obtenerDirigentes();
  }

  obtenerDirigentes() {
    this._dirigenteService.getDirigentes().subscribe(
      (data) => {
        let dataEditado = this.agregarClubDetalle(data);
        this.listDirigentes = dataEditado;
        this.listFiltered = dataEditado;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarDirigente(id: any) {
    this._dirigenteService.deleteDirigente(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Dirigente eliminado');
        this.obtenerDirigentes();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarClubDetalle(original: Dirigente[]) {
    original.map((Dirigente) => {
      if (Dirigente.club) {
        let id = Dirigente.club;
        this._clubService.getClub(id).subscribe(
          (data) => {
            Dirigente.clubDetalle = data.detalle;
            Dirigente.filter = `${Dirigente.dni} - ${Dirigente.nombres} ${Dirigente.apellidos} -  ${data.detalle}`
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    return original;
  }

  filterSelect(item: any) {
    this.listFiltered = this.listDirigentes.filter(t => t.filter?.includes(item.filter.toUpperCase()));
  }

  filterCleared() {
    this.listFiltered = this.listDirigentes
  }

  filterChange(item: any) {
    let filter = item.target.value
    if (filter == "") {
      this.listFiltered = this.listDirigentes
    } else {
      this.listFiltered = this.listDirigentes.filter(t => t.filter?.includes(filter.toUpperCase()));
    }
  }
}
