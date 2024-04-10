import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/Jugador';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { ClubService } from 'src/app/services/club/club.service';
import { Fecha } from 'src/app/functions/fecha/fecha';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Categoria } from 'src/app/models/Categoria';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jug-ver',
  templateUrl: './jug-ver.component.html',
  styleUrls: ['./jug-ver.component.scss'],
})
export class JugVerComponent implements OnInit {
  filterForm: FormGroup;
  page: number = 1;
  pageSize: number = 10;
  maxSize: number = 5;
  sortDir = 'asc';
  columOrder = 'cedula';
  listJugadores: Jugador[] = [];
  listFiltered: Jugador[] = [];
  listRepeat: Jugador[] = [];
  listCategorias: Categoria[] = [];
  viewInfoTable:boolean = false

  keyword = 'detalle';

  constructor(
    private fb: FormBuilder,
    private _jugadorService: JugadorService,
    private _clubService: ClubService,
    private toastr: ToastrService,
    private _categoriaService: CategoriaService
  ) {
    this.filterForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      dni: [''],
      cedula: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerJugadores();
    this.obtenerCategorias();
  }

  detectarList(){
    if(this.listRepeat.length > 0){
      this.viewInfoTable = true
    }
  }

  obtenerJugadores() {
    if(!(this.filterForm.value.nombre || this.filterForm.value.apellido || this.filterForm.value.dni || this.filterForm.value.cedula)){
      this._jugadorService.getJugadores().subscribe(
        (data) => {
          this.listJugadores = data;
          this.listFiltered = data;
          this.buscarIguales(data);
          this.detectarList();
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      let filtro = {
        nombre: (this.filterForm.value.nombre).toUpperCase(),
        apellido: (this.filterForm.value.apellido).toUpperCase(),
        dni: (this.filterForm.value.dni).toUpperCase(),
        cedula: (this.filterForm.value.cedula).toUpperCase(),
      }
      this._jugadorService.getJugadoresFilter(filtro).subscribe(
        (data) => {
          this.listJugadores = data;
          this.listFiltered = data;
          this.buscarIguales(data);
          this.detectarList();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  buscarIguales(jugadores: Jugador[]) {

    var listRepeat:any = []
    let modifiedArr = jugadores.map(function(element: any){
      var listFiltered = []
      listFiltered = jugadores.filter(t => t.nombres?.includes(element.nombres) && t.apellidos?.includes(element.apellidos));
      var obj:any = []
      if (listFiltered.length > 1){
          obj = listFiltered[0]
          obj.repeat = listFiltered.length
          listRepeat.push(obj);
          if(listRepeat.includes(listFiltered[0].nombres)){
            console.log(listFiltered[0].nombres + " ya esta en la lista", listRepeat)
          }
      }
      return obj;
    });
    modifiedArr = modifiedArr.filter(item => item.length != 0)
    this.listRepeat = modifiedArr
  }

  eliminarJugador(id: any) {
    this._jugadorService.deleteJugador(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Jugador eliminado');
        this.obtenerJugadores();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterSelect(item: any) {
    this.listFiltered = this.listJugadores.filter(t=>t.filter?.includes(item.filter.toUpperCase()));
  }

  filterCleared() {
    this.listFiltered = this.listJugadores
  }

  filterChange(item: any) {
    let filter = item.target.value
    if (filter == ""){
      this.listFiltered = this.listJugadores
    }else {
      this.listFiltered = this.listJugadores.filter(t=>t.filter?.includes(filter.toUpperCase()));
    }
  }

  obtenerCategorias() {
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

  changeCategorias() {
    let dateTime = new Date();
    let year = parseInt(Fecha.formatDate_yyyy(dateTime.toISOString()));
    let stop = false

    let objArray:any = []

    this.listJugadores.map((jugador) => {

      const JUGADOR: any = {
        id: jugador._id,
        categoria: jugador.categoria,
      };

      let getNacFec = (jugador.fecha_nacimiento)!.toString();
      let nacFec = parseInt(getNacFec.substring(0, 4));
      this.listCategorias.forEach((cat) => {
        const min = cat.desde;
        const max = cat.hasta;
        const age = year - nacFec;

        if (age >= min && age <= max) {
          if (jugador.categoria == cat.detalle){
            stop = true
          }else{
            stop = false
            JUGADOR.categoria = cat.detalle
          }

          objArray.push(JUGADOR);
        }
      });

      if(!stop){
        this._jugadorService.editCategoria(JUGADOR).subscribe(
          (data) => {
            console.log("actualizado")
          },
          (error) => {
            console.log(error);
          }
        );
      }

    });
  }

}
