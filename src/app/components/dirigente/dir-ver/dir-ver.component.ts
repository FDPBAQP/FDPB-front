import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dirigente } from 'src/app/models/Dirigente';
import { DirigenteService } from 'src/app/services/dirigente/dirigente.service';

@Component({
  selector: 'app-dir-ver',
  templateUrl: './dir-ver.component.html',
  styleUrls: ['./dir-ver.component.scss'],
})
export class DirVerComponent implements OnInit {
  listDirigentes: Dirigente[] = [];

  constructor(
    private _dirigenteService: DirigenteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerDirigentes();
  }

  obtenerDirigentes() {
    this._dirigenteService.getDirigentes().subscribe(
      (data) => {
        this.listDirigentes = data;
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
}
