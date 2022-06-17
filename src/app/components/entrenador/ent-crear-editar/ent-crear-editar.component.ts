import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entrenador } from 'src/app/models/Entrenador';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador.service';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-ent-crear-editar',
  templateUrl: './ent-crear-editar.component.html',
  styleUrls: ['./ent-crear-editar.component.scss'],
})
export class EntCrearEditarComponent implements OnInit {
  entrenadorForm: FormGroup;
  titulo = 'Crear Entrenador';
  id: string | null;
  slcClub: boolean = true;
  listClubes: Club[] = [];
  keywordClub = 'detalle';
  clubtemp = '';

  selectEvent(item: any) {
    this.clubtemp = item.detalle;
    // do something with selected item
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _entrenadorService: EntrenadorService,
    private aRoute: ActivatedRoute,
    private _clubService: ClubService
  ) {
    this.entrenadorForm = this.fb.group({
      dni: ['', Validators.required],
      club: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    setTimeout(() => {
      document.getElementsByName("input-0")[0].focus();
    }, 20);
    this.cargarSelects();
  }

  cargarSelects() {
    this.obtenerClubes();
  }

  agregarEntrenador() {
    const ENTRENADOR: Entrenador = {
      dni: this.entrenadorForm.get('dni')?.value,
      club: this.clubtemp,
      apellidos: this.entrenadorForm.get('apellidos')?.value,
      nombres: this.entrenadorForm.get('nombres')?.value,
      nacionalidad: this.entrenadorForm.get('nacionalidad')?.value,
      telefono: this.entrenadorForm.get('telefono')?.value,
    };

    if (this.id !== null) {
      this._entrenadorService.editEntrenador(this.id, ENTRENADOR).subscribe(
        (data) => {
          this.toastr.success(
            'El entrenador ' +
            this.entrenadorForm.get('nombres')?.value +
            ' ' +
            this.entrenadorForm.get('apellidos')?.value +
            ' fue actualizado correctamente!',
            'Entrenador actualizado!'
          );
          this.router.navigate(['/entrenador']);
        },
        (error) => {
          console.log(error);
          this.entrenadorForm.reset();
        }
      );
    } else {
      this._entrenadorService.saveEntrenador(ENTRENADOR).subscribe(
        (data) => {
          this.toastr.success(
            'El entrenador ' +
            this.entrenadorForm.get('nombres')?.value +
            ' ' +
            this.entrenadorForm.get('apellidos')?.value +
            ' fue agregado correctamente!',
            'Entrenador agregado!'
          );
          this.router.navigate(['/entrenador']);
        },
        (error) => {
          console.log(error);
          this.entrenadorForm.reset();
        }
      );
    }
  }


  keytab(event: any) {
    const input = event.target.name;
    if (input != "submit") {
      const num = parseInt(input.substring(6, 7))
      const nextInput = num + 1
      event.preventDefault();
      let element: any = document.getElementsByName("input-" + nextInput)[0];

      if (element == null) {
        if (this.entrenadorForm.valid) {
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
      this.titulo = 'Editar Entrenador';
      this._entrenadorService.getEntrenador(this.id).subscribe(
        (data) => {
          this.clubtemp = data.club;
          this.entrenadorForm.setValue({
            dni: data.dni,
            club: data.club,
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
            nacionalidad: data.nacionalidad,
          });

          this.slcClub = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  obtenerClubes() {
    this._clubService.getClubes().subscribe(
      (data) => {
        this.listClubes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  slcClubChange() {
    let val = this.entrenadorForm.get('club')?.value;
    if (val != '') {
      this.slcClub = false;
    }
  }
}
