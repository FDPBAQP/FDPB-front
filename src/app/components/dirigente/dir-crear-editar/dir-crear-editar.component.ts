import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dirigente } from 'src/app/models/Dirigente';
import { DirigenteService } from 'src/app/services/dirigente/dirigente.service';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/services/cargo/cargo.service';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-dir-crear-editar',
  templateUrl: './dir-crear-editar.component.html',
  styleUrls: ['./dir-crear-editar.component.scss'],
})
export class DirCrearEditarComponent implements OnInit {
  dirigenteForm: FormGroup;
  titulo = 'Crear Dirigente';
  id: string | null;
  slcCargo: boolean = true;
  listCargos: Cargo[] = [];
  slcClub: boolean = true;
  listClubes: Club[] = [];
  keyword = 'detalle';
  clubtemp = '';
  cargotemp = '';

  selectClub(item: any) {
    this.clubtemp = item.detalle;
  }

  selectCargo(item: any) {
    this.cargotemp = item.detalle;
    console.log("en selectCargo", this.cargotemp)
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _dirigenteService: DirigenteService,
    private aRoute: ActivatedRoute,
    private _cargoService: CargoService,
    private _clubService: ClubService
  ) {
    this.dirigenteForm = this.fb.group({
      dni: ['', Validators.required],
      club: ['', Validators.required],
      cargo: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    document.getElementsByName("input-0")[0].focus();
    this.cargarSelects();
  }

  cargarSelects() {
    this.obtenerCargos();
    this.obtenerClubes();
  }

  agregarDirigente() {
    const DIRIGENTE: Dirigente = {
      dni: this.dirigenteForm.get('dni')?.value,
      club: this.clubtemp,
      cargo: this.cargotemp,
      nombres: this.dirigenteForm.get('nombres')?.value,
      apellidos: this.dirigenteForm.get('apellidos')?.value,
      telefono: this.dirigenteForm.get('telefono')?.value,
    };

    if (this.id !== null) {
      this._dirigenteService.editDirigente(this.id, DIRIGENTE).subscribe(
        (data) => {
          this.toastr.success(
            'El dirigente ' +
            this.dirigenteForm.get('nombres')?.value +
            ' ' +
            this.dirigenteForm.get('apellidos')?.value +
            ' fue actualizado correctamente!',
            'Dirigente actualizado!'
          );
          this.router.navigate(['/dirigente']);
        },
        (error) => {
          console.log(error);
          this.dirigenteForm.reset();
        }
      );
    } else {
      this._dirigenteService.saveDirigente(DIRIGENTE).subscribe(
        (data) => {
          this.toastr.success(
            'El dirigente ' +
            this.dirigenteForm.get('nombres')?.value +
            ' ' +
            this.dirigenteForm.get('apellidos')?.value +
            ' fue agregado correctamente!',
            'Dirigente agregado!'
          );
          this.router.navigate(['/dirigente']);
        },
        (error) => {
          console.log(error);
          this.dirigenteForm.reset();
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
        if (this.dirigenteForm.valid) {
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
      this.titulo = 'Editar Dirigente';
      this._dirigenteService.getDirigente(this.id).subscribe(
        (data) => {
          this.clubtemp = data.club;
          this.cargotemp = data.cargo;
          this.dirigenteForm.setValue({
            dni: data.dni,
            club: data.club,
            cargo: data.cargo,
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
          });

          this.slcClub = false;
          this.slcCargo = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
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

  slcCargoChange() {
    let val = this.dirigenteForm.get('cargo')?.value;
    if (val != '') {
      this.slcCargo = false;
    }
  }

  slcClubChange() {
    let val = this.dirigenteForm.get('club')?.value;
    if (val != '') {
      this.slcClub = false;
    }
  }
}
