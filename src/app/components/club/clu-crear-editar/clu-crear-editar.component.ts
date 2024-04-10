import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-clu-crear-editar',
  templateUrl: './clu-crear-editar.component.html',
  styleUrls: ['./clu-crear-editar.component.scss'],
})
export class CluCrearEditarComponent implements OnInit {
  clubForm: FormGroup;
  inputFocus: number = 0;titulo = 'Crear Club';
  id: string | null;
  today!: Date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _clubService: ClubService,
    private aRoute: ActivatedRoute
  ) {
    this.clubForm = this.fb.group({
      club: ['', Validators.required],
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

  agregarClub() {
    const CLUB: Club = {
      detalle: this.clubForm.get('club')?.value.toUpperCase(),
      tipo: 'inicio',
      fecha_grabacion: this.today,
    };

    if (this.id !== null) {
      this._clubService.editClub(this.id, CLUB).subscribe(
        (data) => {
          this.toastr.success(
            'El club ' +
            this.clubForm.get('club')?.value +
            ' fue actualizado correctamente!',
            'Club actualizado!'
          );
          this.router.navigate(['/club']);
        },
        (error) => {
          console.log(error);
          this.clubForm.reset();
        }
      );
    } else {
      this._clubService.saveClub(CLUB).subscribe(
        (data) => {
          this.toastr.success(
            'El club ' +
            this.clubForm.get('club')?.value +
            ' fue agregado correctamente!',
            'Club agregado!'
          );
          this.router.navigate(['/club']);
        },
        (error) => {
          console.log(error);
          this.clubForm.reset();
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
      if (this.clubForm.valid) {
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
      this.titulo = 'Editar Club';
      this._clubService.getClub(this.id).subscribe(
        (data) => {
          this.clubForm.setValue({
            club: data.detalle,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
