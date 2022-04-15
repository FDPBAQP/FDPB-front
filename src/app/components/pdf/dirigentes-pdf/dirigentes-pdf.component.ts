import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dirigente } from 'src/app/models/Dirigente';
import { DirigenteService } from 'src/app/services/dirigente/dirigente.service';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-dirigentes-pdf',
  templateUrl: './dirigentes-pdf.component.html',
  styleUrls: ['./dirigentes-pdf.component.scss']
})
export class DirigentesPdfComponent implements OnInit {
  listDirigentes: Dirigente[] = [];
  listDirigentesTabla: Dirigente[] = [];
  dirigentetemp = '';

  selectEvent(item: any) {
    this.dirigentetemp = item._id;
    console.log(this.dirigentetemp)

    if (this.listDirigentesTabla.length > 11) {
      this.toastr.warning('No puede agregar más de 12 carnets por hoja!');
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
    private _dirigenteService: DirigenteService,
    private _clubService: ClubService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerDririgentes();
  }

  obtenerDririgentes() {
    this._dirigenteService.getDirigentes().subscribe(
      (data) => {
        this.listDirigentes = data;
        console.log("this.listDririgentes", this.listDirigentes)
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
}
