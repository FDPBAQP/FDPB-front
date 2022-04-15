import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Entrenador } from 'src/app/models/Entrenador';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador.service';

@Component({
  selector: 'app-ent-ver',
  templateUrl: './ent-ver.component.html',
  styleUrls: ['./ent-ver.component.scss'],
})
export class EntVerComponent implements OnInit {
  listEntrenadors: Entrenador[] = [];

  constructor(
    private _entrenadorService: EntrenadorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerEntrenadors();
  }

  obtenerEntrenadors() {
    this._entrenadorService.getEntrenadores().subscribe(
      (data) => {
        this.listEntrenadors = data;
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
        this.obtenerEntrenadors();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
