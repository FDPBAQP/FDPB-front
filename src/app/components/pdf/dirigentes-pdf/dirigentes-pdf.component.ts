import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dirigente } from 'src/app/models/Dirigente';
import { DirigenteService } from 'src/app/services/dirigente/dirigente.service';
import { ClubService } from 'src/app/services/club/club.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dirigentes-pdf',
  templateUrl: './dirigentes-pdf.component.html',
  styleUrls: ['./dirigentes-pdf.component.scss']
})
export class DirigentesPdfComponent implements OnInit {
  listDirigentes: Dirigente[] = [];
  listDirigentesTabla: Dirigente[] = [];
  dirigentetemp = '';
  filtroForm: FormGroup;
  inputFocus: number = 0;

  selectEvent(item: any) {
    this.dirigentetemp = item._id;

    this.filtroForm.setValue({
      dni: '',
      nombres: '',
      apellidos: ''
    });

    if (this.listDirigentesTabla.length > 4) {
      this.toastr.warning('No puede agregar más de 5 carnets por hoja!');
    } else {
      this._dirigenteService.getDirigente(this.dirigentetemp).subscribe(
        (data) => {
          var id = data.club;
          this._clubService.getClub(id).subscribe(
            (club) => {
              data.club = club.detalle;
            },
            (error) => {
              console.log(error);
            }
          );
          this.listDirigentesTabla.push(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  constructor(
    private fb: FormBuilder,
    private _dirigenteService: DirigenteService,
    private _clubService: ClubService,
    private toastr: ToastrService,
    private router: Router) {
    this.filtroForm = this.fb.group({
      dni: [''],
      nombres: [''],
      apellidos: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerDririgentes();
  }

  ngAfterViewInit() {
    document.getElementsByTagName("input")[0].focus();
  }

  obtenerDririgentes() {
    this._dirigenteService.getDirigentes().subscribe(
      (data) => {
        this.listDirigentes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  quitar() {
    this.listDirigentesTabla.pop();
  }

  ver() {
    this._dirigenteService.setData(this.listDirigentesTabla);
    this.router.navigateByUrl('/vizualizacion-pdf');
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
      if (this.filtroForm.valid) {
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

}
