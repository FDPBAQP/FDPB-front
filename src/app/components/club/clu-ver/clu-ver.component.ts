import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';
import { Fecha } from 'src/app/functions/fecha/fecha';

@Component({
  selector: 'app-clu-ver',
  templateUrl: './clu-ver.component.html',
  styleUrls: ['./clu-ver.component.scss'],
})
export class CluVerComponent implements OnInit {
  listClubes: Club[] = [];

  constructor(
    private _clubService: ClubService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerClubes();
  }

  obtenerClubes() {
    this._clubService.getClubes().subscribe(
      (data) => {
        this.listClubes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarClub(id: any) {
    this._clubService.deleteClub(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Club eliminado');
        this.obtenerClubes();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate_yyyymmdd(date: any) {
    return Fecha.formatDate_yyyymmdd(date);
  }
}
