import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { DirigenteService } from 'src/app/services/dirigente/dirigente.service';
import { Router } from '@angular/router';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador.service';

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
    var newImg = '';
    var element = document.getElementById('carnets');
    var fila: number = 0;

    switch (this.list.length) {
      case 1:
        fila = 52;
        break;
      case 2:
        fila = 103.9;
        break;
      case 3:
        fila = 155.9;
        break;
      case 4:
        fila = 207.9;
        break;
      case 5:
        fila = 260;
        break;
    }

    if (element != null) {
      html2canvas(element).then((canvasDel) => {
        newImg = canvasDel.toDataURL('image/png');

        setTimeout(function () {
          doc.addImage(newImg, 19.82, 6, 170, fila);
        }, 2000);

        // var y = 500;
        // if (y >= pageHeight) {
        //   setTimeout(function () {
        //     doc.addPage();
        //   }, 3000);

        //   y = 0;
        // }

        // setTimeout(function () {
        //   doc.addImage(newImg, 19.82, 6, 170, fila);
        // }, 3000);

        setTimeout(function () {
          doc.save('cadula.pdf');
        }, 3000);
      });
    }
  }
}
