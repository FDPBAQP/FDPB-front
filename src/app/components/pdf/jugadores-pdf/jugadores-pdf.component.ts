import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/Jugador';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { ClubService } from 'src/app/services/club/club.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jugadores-pdf',
  templateUrl: './jugadores-pdf.component.html',
  styleUrls: ['./jugadores-pdf.component.scss'],
})
export class JugadoresPdfComponent implements OnInit {
  listJugadores: Jugador[] = [];
  listJugadoresTabla: Jugador[] = [];
  jugadortemp = '';
  filtroForm: FormGroup;

  selectEvent(item: any) {
    this.jugadortemp = item._id;

    this.filtroForm.setValue({
      cedula: '',
      nombres: '',
      apellidos: ''
    });

    if (this.listJugadoresTabla.length > 4) {
      this.toastr.warning('No puede agregar más de 5 carnets por hoja!');
    } else {
      this._jugadorService.getJugador(this.jugadortemp).subscribe(
        (data) => {
          this.listJugadoresTabla.push(data);
          this.club();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  constructor(
    private fb: FormBuilder,
    private _jugadorService: JugadorService,
    private _clubService: ClubService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.filtroForm = this.fb.group({
      cedula: [''],
      nombres: [''],
      apellidos: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerJugadores();
  }

  obtenerJugadores() {
    this._jugadorService.getJugadores().subscribe(
      (data) => {
        this.listJugadores = data;
        console.log("this.listJugadores", this.listJugadores)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  quitar() {
    this.listJugadoresTabla.pop();
  }

  ver() {
    this._jugadorService.setData(this.listJugadoresTabla);
    this.router.navigateByUrl('/vizualizacion-pdf');
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
    this.listJugadoresTabla.map((jugador) => {
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
