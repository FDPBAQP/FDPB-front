import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entrenador } from 'src/app/models/Entrenador';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador.service';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-entrenadores-pdf',
  templateUrl: './entrenadores-pdf.component.html',
  styleUrls: ['./entrenadores-pdf.component.scss']
})
export class EntrenadoresPdfComponent implements OnInit {
  listEntrenadores: Entrenador[] = [];
  listEntrenadoresTabla: Entrenador[] = [];
  entrenadortemp = '';

  selectEvent(item: any) {
    this.entrenadortemp = item._id;
    console.log(this.entrenadortemp)

    if (this.listEntrenadoresTabla.length > 11) {
      this.toastr.warning('No puede agregar más de 12 carnets por hoja!');
    } else {
      this._entrenadorService.getEntrenador(this.entrenadortemp).subscribe(
        (data) => {
          this.listEntrenadoresTabla.push(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  constructor(
    private _entrenadorService: EntrenadorService,
    private _clubService: ClubService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerDririgentes();
  }

  obtenerDririgentes() {
    this._entrenadorService.getEntrenadores().subscribe(
      (data) => {
        this.listEntrenadores = data;
        console.log("this.listDririgentes", this.listEntrenadores)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  quitar() {
    this.listEntrenadoresTabla.pop();
  }

  ver() {
    this._entrenadorService.setData(this.listEntrenadoresTabla);
    this.router.navigateByUrl('/vizualizacion-pdf');
  }
}
