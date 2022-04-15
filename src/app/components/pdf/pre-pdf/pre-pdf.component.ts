import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { DirigenteService } from 'src/app/services/dirigente/dirigente.service';
import { Router } from '@angular/router';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador.service';
import { Jugador } from 'src/app/models/Jugador';
import { Dirigente } from 'src/app/models/Dirigente';
import { Entrenador } from 'src/app/models/Entrenador';

@Component({
  selector: 'app-pre-pdf',
  templateUrl: './pre-pdf.component.html',
  styleUrls: ['./pre-pdf.component.scss'],
})
export class PrePdfComponent implements OnInit {
  dataJugadores = this._jugadorService.getData();
  dataDirigente = this._dirigenteService.getData();
  dataEntrenador = this._entrenadorService.getData();
  list: any;
  currentTime = new Date();
  year = this.currentTime.getFullYear();
  origenData = ''

  constructor(private _jugadorService: JugadorService, private _dirigenteService: DirigenteService, private _entrenadorService: EntrenadorService, private router: Router) {
    if (this.dataJugadores) {

      this.list = this.dataJugadores;
      this.origenData = "jug"
    } else if (this.dataDirigente) {
      this.list = this.dataDirigente;
      this.origenData = "dir"
    } else if (this.dataEntrenador) {
      this.list = this.dataEntrenador;
      this.origenData = "ent"
    } else {
      window.history.go(-1);
      window.history.back();
    }
  }

  ngOnInit(): void { }

  parImpar(numero: number) {
    if (numero % 2 == 0) {
      return true;
    } else {
      return false;
    }
  }

  download() {
    var doc = new jsPDF('p', 'mm', [297, 210]);
    var pageHeight = doc.internal.pageSize.height;
    var pageWidth = doc.internal.pageSize.width;
    var newImgDel = '';
    var newImg = '';
    var elementDel = document.getElementById('carnet-delantero');
    var element = document.getElementById('carnet-trasero');
    var fila: number = 0;

    switch (this.list.length) {
      case 1:
      case 2:
        fila = 46.7;
        break;
      case 3:
      case 4:
        fila = 93.5;
        break;
      case 5:
      case 6:
        fila = 140;
        break;
      case 7:
      case 8:
        fila = 186.5;
        break;
      case 9:
      case 10:
        fila = 233;
        break;
      case 11:
      case 12:
        fila = 280;
        break;
    }

    if (elementDel != null) {
      html2canvas(elementDel).then((canvasDel) => {
        newImgDel = canvasDel.toDataURL('image/png');
      });
    }

    if (element != null) {
      html2canvas(element).then((canvas) => {
        newImg = canvas.toDataURL('image/png');

        setTimeout(function () {
          doc.addImage(newImgDel, 19.82, 6, 170, fila);
        }, 2000);

        var y = 500;
        if (y >= pageHeight) {
          setTimeout(function () {
            doc.addPage();
          }, 3000);

          y = 0;
        }

        setTimeout(function () {
          doc.addImage(newImg, 19.82, 6, 170, fila);
        }, 3000);

        setTimeout(function () {
          doc.save('cadula.pdf');
        }, 5000);
      });
    }
  }
}
