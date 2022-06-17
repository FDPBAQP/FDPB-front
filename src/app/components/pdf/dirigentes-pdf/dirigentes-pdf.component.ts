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
    setTimeout(() => {
      document.getElementsByName("input-0")[0].focus();
    }, 20);
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
    const input = event.target.name;
    if (input != "submit") {
      const num = parseInt(input.substring(6, 7))
      const nextInput = num + 1
      event.preventDefault();
      let element: any = document.getElementsByName("input-" + nextInput)[0];

      if (element == null) {
        if (this.filtroForm.valid) {
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
