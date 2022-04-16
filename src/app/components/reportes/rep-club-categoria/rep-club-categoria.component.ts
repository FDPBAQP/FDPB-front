import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { Club } from 'src/app/models/Club';
import { Categoria } from 'src/app/models/Categoria';
import { Jugador } from 'src/app/models/Jugador';
import { ClubService } from 'src/app/services/club/club.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

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
}
