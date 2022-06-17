import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { Jugador } from 'src/app/models/Jugador';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Fecha } from 'src/app/functions/fecha/fecha';

@Component({
  selector: 'app-clu-transferir',
  templateUrl: './clu-transferir.component.html',
  styleUrls: ['./clu-transferir.component.scss'],
})
export class CluTransferirComponent implements OnInit {
  ngOnInit(): void {
    this.getCLubes();
    setTimeout(() => {
      this.getJugadorClubes();
      this.getJugador();
    }, 2000);

    setTimeout(() => {
      document.getElementsByName("input-0")[0].focus();
    }, 20);
    let dateTime = new Date();

    this.transferenciaForm.setValue({
      club: '',
      tipo: 'excepcional',
      fecha: Fecha.formatDate_yyyymmdd(dateTime.toISOString()),
    });
  }

  selectEvent(item: any) {
    this.clubtemp = item._id;
    // do something with selected item
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _jugadorService: JugadorService,
    private aRoute: ActivatedRoute,
    private _clubService: ClubService,
    private _categoriaService: CategoriaService
  ) {
    this.transferenciaForm = this.fb.group({
      club: ['', Validators.required],
      tipo: [''],
      fecha: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  transferenciaForm: FormGroup;
  id: string | null;
  clubtemp: string | null | undefined;
  jugadorClubes: Club[] = [];
  jugadorClubesSend: Club[] = [];
  jugadorData: Jugador[] = [];
  listClubes: Club[] = [];
  keywordClub = 'detalle';
  jugadorNombre = 'Jugador';

  agregarTransferencia() {
    if (this.clubtemp != null || this.clubtemp != undefined) {
      let dateTime = new Date();
      this.jugadorClubesSend.unshift({
        fecha_grabacion: dateTime.toISOString(),
        detalle: this.clubtemp,
        tipo: this.transferenciaForm.value.tipo,
      });
    }

    const JUGADOR: Jugador = {
      club: this.jugadorClubesSend,
    };

    if (this.id !== null) {
      this._jugadorService.editJugador(this.id, JUGADOR).subscribe(
        (data) => {
          this.toastr.success(
            `El jugador fue tranferido!`,
            'Jugador actualizado!'
          );
          this.router.navigate(['/jugador']);
        },
        (error) => {
          console.log(error);
          this.transferenciaForm.reset();
        }
      );
    }
  }

  getJugador() {
    if (this.id !== null) {
      this._jugadorService.getJugador(this.id).subscribe(
        (data) => {
          this.jugadorData = data;
          this.jugadorNombre = data.nombres;
          this.jugadorClubes = data.club;
          this.jugadorClubes.forEach(
            (element: { detalle: string }) =>
            (element.detalle = String(
              this.listClubes.find((e) => e._id === element.detalle)?.detalle
            ))
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getJugadorClubes() {
    if (this.id !== null) {
      this._jugadorService.getJugador(this.id).subscribe(
        (data) => {
          this.jugadorClubesSend = data.club;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  getCLubes() {
    this._clubService.getClubes().subscribe(
      (data) => {
        this.listClubes = data;
      },
      (error) => {
        console.log(error);
      }
    );
    return true;
  }

  formatDate_ddmmyyyy(date: any) {
    return Fecha.formatDate_ddmmyyyy(date);
  }

  keytab(event: any) {
    const input = event.target.name;
    if (input != "submit") {
      const num = parseInt(input.substring(6, 7))
      const nextInput = num + 1
      event.preventDefault();
      let element: any = document.getElementsByName("input-" + nextInput)[0];

      if (element == null) {
        if (this.transferenciaForm.valid) {
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
}
