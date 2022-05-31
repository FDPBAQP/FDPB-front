import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/services/cargo/cargo.service';
import { Fecha } from 'src/app/functions/fecha/fecha';

@Component({
  selector: 'app-car-ver',
  templateUrl: './car-ver.component.html',
  styleUrls: ['./car-ver.component.scss'],
})
export class CarVerComponent implements OnInit {
  listCargos: Cargo[] = [];

  constructor(
    private _cargoService: CargoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerCargos();
  }

  obtenerCargos() {
    this._cargoService.getCargos().subscribe(
      (data) => {
        this.listCargos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarCargo(id: any) {
    this._cargoService.deleteCargo(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Cargo eliminado');
        this.obtenerCargos();
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
