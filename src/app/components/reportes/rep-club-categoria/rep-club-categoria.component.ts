import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { Club } from 'src/app/models/Club';
import { Categoria } from 'src/app/models/Categoria';
import { Jugador } from 'src/app/models/Jugador';
import { ClubService } from 'src/app/services/club/club.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Fecha } from 'src/app/functions/fecha/fecha';

@Component({
  selector: 'app-rep-club-categoria',
  templateUrl: './rep-club-categoria.component.html',
  styleUrls: ['./rep-club-categoria.component.scss'],
})
export class RepClubCategoriaComponent implements OnInit {
  filtrosForm: FormGroup;
  listClubes: Club[] = [];
  listCategorias: Categoria[] = [];
  listJugadores: Jugador[] = [];
  keyword = 'detalle';
  categoria = '';
  club = '';
  clubDet = '';

  constructor(
    private fb: FormBuilder,
    private _jugadorService: JugadorService,
    private _clubService: ClubService,
    private _categoriaService: CategoriaService
  ) {
    this.filtrosForm = this.fb.group({
      club: [''],
      categoria: [''],
    });
  }

  ngOnInit(): void {
    this.getCLubes();
    this.getCategorias();
  }

  ngAfterViewInit() {
    document.getElementsByTagName("input")[0].focus();
  }


  selectClub(item: any) {
    this.club = item._id;
  }

  selectCategoria(item: any) {
    this.categoria = item.detalle;
  }

  Buscar() {
    if (this.filtrosForm.get('categoria')?.value == null || this.filtrosForm.get('categoria')?.value == "" || this.filtrosForm.get('categoria')?.value == undefined) {
      this.categoria = ''
    }
    if (this.filtrosForm.get('club')?.value == null || this.filtrosForm.get('club')?.value == "" || this.filtrosForm.get('club')?.value == undefined) {
      this.club = '';
    }

    const FILTROS = `cat=${this.categoria}&clu=${this.club}`;

    this._jugadorService.getConFiltros(FILTROS).subscribe(
      (data) => {
        this.listJugadores = data;
        this.changeClub();
      },
      (error) => {
        console.log(error);
      }
    );
    this.filtrosForm.setValue({
      club: '',
      categoria: '',
    });
  }

  changeClub() {
    this.listJugadores.map((jugador) => {
      if (jugador.club.length > 0) {
        var id = jugador.club[0].detalle;
        this._clubService.getClub(id).subscribe(
          (data) => {
            jugador.club[0].detalle = data.detalle;
            if (this.club != '') {
              this.club = data.detalle;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  getCLubes() {
    this._clubService.getClubes().subscribe(
      (data) => {
        this.listClubes = data;
      },
      (error) => {
        console.log(error);
      }
    );
    return true;
  }

  getCategorias() {
    this._categoriaService.getCategorias().subscribe(
      (data) => {
        this.listCategorias = data;
      },
      (error) => {
        console.log(error);
      }
    );
    return true;
  }

  keytab(event: any) {
    const input = event.target.name;
    if (input != "submit") {
      const num = parseInt(input.substring(6, 7))
      const nextInput = num + 1
      event.preventDefault();
      let element: any = document.getElementsByName("input-" + nextInput)[0];

      if (element == null) {
        if (this.filtrosForm.valid) {
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

  formatDate_yyyymmdd(date: any) {
    return Fecha.formatDate_yyyymmdd(date);
  }

  printPage() {
    var divElements = document.getElementById("tabla")?.innerHTML;
    document.body.innerHTML =
      '<html><head><meta charset="utf-8"/><title>LIGA DEPORTIVA DISTRITAL DE BASKETBALL MASCULINO DE AREQUIPA</title><base href="/" /><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="icon" type="image/x-icon" href="favicon.ico" /></head><body>' +
      divElements + '</body>';
    window.print();
    window.location.reload();
  }
}
