import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { CarCrearEditarComponent } from './components/cargo/car-crear-editar/car-crear-editar.component';
import { CarVerComponent } from './components/cargo/car-ver/car-ver.component';
import { CatCrearEditarComponent } from './components/categoria/cat-crear-editar/cat-crear-editar.component';
import { CatVerComponent } from './components/categoria/cat-ver/cat-ver.component';
import { CluCrearEditarComponent } from './components/club/clu-crear-editar/clu-crear-editar.component';
import { CluTransferirComponent } from './components/club/clu-transferir/clu-transferir.component';
import { CluVerComponent } from './components/club/clu-ver/clu-ver.component';
import { DirCrearEditarComponent } from './components/dirigente/dir-crear-editar/dir-crear-editar.component';
import { DirVerComponent } from './components/dirigente/dir-ver/dir-ver.component';
import { EntCrearEditarComponent } from './components/entrenador/ent-crear-editar/ent-crear-editar.component';
import { EntVerComponent } from './components/entrenador/ent-ver/ent-ver.component';
import { JugCrearEditarComponent } from './components/jugador/jug-crear-editar/jug-crear-editar.component';
import { JugVerComponent } from './components/jugador/jug-ver/jug-ver.component';
import { CedulaPdfComponent } from './components/pdf/cedula-pdf/cedula-pdf.component';
import { DirigentesPdfComponent } from './components/pdf/dirigentes-pdf/dirigentes-pdf.component';
import { EntrenadoresPdfComponent } from './components/pdf/entrenadores-pdf/entrenadores-pdf.component';
import { JugadoresPdfComponent } from './components/pdf/jugadores-pdf/jugadores-pdf.component';
import { PrePdfComponent } from './components/pdf/pre-pdf/pre-pdf.component';
import { RepClubCategoriaComponent } from './components/reportes/rep-club-categoria/rep-club-categoria.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'jugador', component: JugVerComponent },
  { path: 'crear-jugador', component: JugCrearEditarComponent },
  { path: 'editar-jugador/:id', component: JugCrearEditarComponent },
  { path: 'entrenador', component: EntVerComponent },
  { path: 'crear-entrenador', component: EntCrearEditarComponent },
  { path: 'editar-entrenador/:id', component: EntCrearEditarComponent },
  { path: 'dirigente', component: DirVerComponent },
  { path: 'crear-dirigente', component: DirCrearEditarComponent },
  { path: 'editar-dirigente/:id', component: DirCrearEditarComponent },
  { path: 'club', component: CluVerComponent },
  { path: 'crear-club', component: CluCrearEditarComponent },
  { path: 'editar-club/:id', component: CluCrearEditarComponent },
  { path: 'cargo', component: CarVerComponent },
  { path: 'crear-cargo', component: CarCrearEditarComponent },
  { path: 'editar-cargo/:id', component: CarCrearEditarComponent },
  { path: 'categoria', component: CatVerComponent },
  { path: 'crear-categoria', component: CatCrearEditarComponent },
  { path: 'editar-categoria/:id', component: CatCrearEditarComponent },
  { path: 'vizualizacion-pdf', component: PrePdfComponent },
  { path: 'jugadores-pdf', component: JugadoresPdfComponent },
  { path: 'dirigentes-pdf', component: DirigentesPdfComponent },
  { path: 'entrenadores-pdf', component: EntrenadoresPdfComponent },
  { path: 'cedula-pdf/:id', component: CedulaPdfComponent },
  { path: 'transferir/:id', component: CluTransferirComponent },
  { path: 'reporte-club-categoria', component: RepClubCategoriaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
