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
  inputFocus: number = 0;titulo = 'Crear Entrenador';
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
    this.cargarSelects();
  }

  ngAfterViewInit() {
    document.getElementsByTagName("input")[0].focus();
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
    const inputs = document.getElementsByTagName("input");
    let maxInputs = inputs.length
    let nextInput = document.getElementsByTagName("input")[this.inputFocus + 1]
    let readonly = null;

    if (nextInput != undefined) {
      readonly = nextInput.readOnly
    }else{
      this.inputFocus = maxInputs
    }

    if (readonly != null) {
      if (readonly) {
        this.inputFocus = this.inputFocus + 2
      } else {
        this.inputFocus = this.inputFocus + 1
      }
    }

    if (this.inputFocus >= maxInputs) {
      if (this.entrenadorForm.valid) {
        document.getElementsByName("submit")[0].focus();
      }
      else {
        this.inputFocus = 0
        document.getElementsByTagName("input")[this.inputFocus].focus();
      }
    }
    else {
      document.getElementsByTagName("input")[this.inputFocus].focus();
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
