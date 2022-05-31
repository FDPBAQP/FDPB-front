import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/Jugador';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-jug-ver',
  templateUrl: './jug-ver.component.html',
  styleUrls: ['./jug-ver.component.scss'],
})
export class JugVerComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  maxSize: number = 5;
  sortDir = 'asc';
  columOrder = 'cedula';
  listJugadores: Jugador[] = [];

  constructor(
    private _jugadorService: JugadorService,
    private _clubService: ClubService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerJugadores();
  }

  obtenerJugadores() {
    this._jugadorService.getJugadores().subscribe(
      (data) => {
        this.listJugadores = data;
        this.club();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarJugador(id: any) {
    this._jugadorService.deleteJugador(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Jugador eliminado');
        this.obtenerJugadores();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  club() {
    this.listJugadores.map((jugador) => {
      if (jugador.club.length > 0) {
        var id = jugador.club[0].detalle;
        this._clubService.getClub(id).subscribe(
          (data) => {
            jugador.club[0].detalle = data.detalle;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
