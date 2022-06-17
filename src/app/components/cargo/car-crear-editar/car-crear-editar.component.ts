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
    setTimeout(() => {
      document.getElementsByName("input-0")[0].focus();
    }, 20);
    this.today = new Date();

  }

  agregarCargo() {
    const CARGO: Cargo = {
      detalle: this.cargoForm.get('cargo')?.value,
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
    const input = event.target.name;
    if (input != "submit") {
      const num = parseInt(input.substring(6, 7))
      const nextInput = num + 1
      event.preventDefault();
      let element: any = document.getElementsByName("input-" + nextInput)[0];

      if (element == null) {
        if (this.cargoForm.valid) {
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
