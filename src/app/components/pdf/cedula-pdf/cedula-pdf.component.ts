import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';
import { Fecha } from 'src/app/functions/fecha/fecha';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cedula-pdf',
  templateUrl: './cedula-pdf.component.html',
  styleUrls: ['./cedula-pdf.component.scss'],
})
export class CedulaPdfComponent implements OnInit {
  ngOnInit(): void {
    this.initData();
  }

  id: string | null;
  jugadorClubes: Club[] = [];
  jugador: any;
  age: number = 0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _jugadorService: JugadorService,
    private aRoute: ActivatedRoute,
    private _clubService: ClubService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  initData() {
    if (this.id !== null) {
      let dateTime = new Date();
      var thisYear = Fecha.formatDate_yyyy_num(dateTime.toISOString());
      this._jugadorService.getJugador(this.id).subscribe(
        (data: any) => {
          this.jugador = data;
          this.jugadorClubes = data.club;
          let birYear = Fecha.formatDate_yyyy_num(data.fecha_nacimiento);
          this.changeClubDetail();
          this.age = thisYear - birYear;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  changeClubDetail() {
    this.jugadorClubes.map((club) => {
      var id = club.detalle;
      this._clubService.getClub(id).subscribe(
        (data) => {
          club.detalle = data.detalle;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  download() {
    var doc = new jsPDF('p', 'mm', [297, 210]);
    var newImgDel = '';
    var elementDel = document.getElementById('cedula');

    if (elementDel != null) {
      html2canvas(elementDel).then((canvasDel) => {
        newImgDel = canvasDel.toDataURL('image/png');

        // setTimeout(function () {
        //   doc.addImage(newImgDel, 19.82, 6, 170, 280);
        // }, 2000);

        // setTimeout(function () {
        //   doc.save('cadula.pdf');
        // }, 5000);

        doc.addImage(newImgDel, 5, 6, 200, 280);
        doc.save('cadula.pdf');
      });
    }
  }

  formatDate_yyyymmdd(date: any) {
    return Fecha.formatDate_yyyymmdd(date);
  }

  formatDate_ddmmyyyy(date: any) {
    return Fecha.formatDate_ddmmyyyy(date);
  }
}
