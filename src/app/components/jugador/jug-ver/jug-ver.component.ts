import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/Jugador';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-jug-ver',
  templateUrl: './jug-ver.component.html',
  styleUrls: ['./jug-ver.component.scss'],
})
export class JugVerComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  maxSize: number = 5;
  sortDir = 'asc';
  columOrder = 'cedula';
  listJugadores: Jugador[] = [];
  listFiltered: Jugador[] = [];
  listRepeat: Jugador[] = [];
  viewInfoTable:boolean = false

  keyword = 'detalle';

  constructor(
    private _jugadorService: JugadorService,
    private _clubService: ClubService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerJugadores();
  }

  detectarList(){
    // this.listRepeat = []
    console.log("this.listRepeat.length", this.listRepeat.length)
    console.log("listRepeat", this.listRepeat)
    if(this.listRepeat.length > 0){
      this.viewInfoTable = true
    }
  }

  obtenerJugadores() {
    this._jugadorService.getJugadores().subscribe(
      (data) => {
        let dataEditado = this.agregarClubDetalle(data);
        this.listJugadores = dataEditado;
        this.listFiltered = dataEditado;
        this.buscarIguales(dataEditado);
        this.detectarList();
      },
      (error) => {
        console.log(error);
      }
    );
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
          console.log("indexOf", listRepeat.indexOf(listFiltered[0]._id))
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

  agregarClubDetalle(original: Jugador[]) {
    original.map((jugador) => {
      if (jugador.club.length > 0) {
        var id = jugador.club[0].detalle;
        this._clubService.getClub(id).subscribe(
          (data) => {
            jugador.club[0].detalle = data.detalle;
            jugador.filter = `${jugador.dni} - ${jugador.nombres} ${jugador.apellidos} - ${jugador.cedula} - ${data.detalle}`
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    return original;
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

}
