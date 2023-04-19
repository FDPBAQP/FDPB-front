import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/services/cargo/cargo.service';

@Component({
  selector: 'app-car-crear-editar',
  templateUrl: './car-crear-editar.component.html',
  styleUrls: ['./car-crear-editar.component.scss'],
})
export class CarCrearEditarComponent implements OnInit {
  cargoForm: FormGroup;
  inputFocus: number = 0;
  titulo = 'Crear Cargo';
  id: string | null;
  today!: Date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _cargoService: CargoService,
    private aRoute: ActivatedRoute
  ) {
    this.cargoForm = this.fb.group({
      cargo: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.today = new Date();
  }

  ngAfterViewInit() {
    document.getElementsByTagName("input")[0].focus();
  }

  agregarCargo() {
    const CARGO: Cargo = {
      detalle: this.cargoForm.get('cargo')?.value.toUpperCase(),
      fecha_grabacion: this.today,
    };

    if (this.id !== null) {
      this._cargoService.editCargo(this.id, CARGO).subscribe(
        (data) => {
          this.toastr.success(
            'El cargo ' +
            this.cargoForm.get('cargo')?.value +
            ' fue actualizado correctamente!',
            'Cargo actualizado!'
          );
          this.router.navigate(['/cargo']);
        },
        (error) => {
          console.log(error);
          this.cargoForm.reset();
        }
      );
    } else {
      this._cargoService.saveCargo(CARGO).subscribe(
        (data) => {
          this.toastr.success(
            'El cargo ' +
            this.cargoForm.get('cargo')?.value +
            ' fue agregado correctamente!',
            'Cargo agregado!'
          );
          this.router.navigate(['/cargo']);
        },
        (error) => {
          console.log(error);
          this.cargoForm.reset();
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
      if (this.cargoForm.valid) {
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
      this.titulo = 'Editar Cargo';
      this._cargoService.getCargo(this.id).subscribe(
        (data) => {
          this.cargoForm.setValue({
            cargo: data.detalle,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
