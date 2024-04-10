export class Entrenador {
  _id?: number;
  dni: string;
  club: string;
  clubDetalle?: string;
  apellidos: string;
  nombres: string;
  nacionalidad: string;
  telefono: string;
  filter?: string;

  constructor(
    dni: string,
    club: string,
    clubDetalle: string,
    apellidos: string,
    nombres: string,
    nacionalidad: string,
    telefono: string,
    filter: string,
  ) {
    this.dni = dni;
    this.club = club;
    this.clubDetalle = clubDetalle;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.nacionalidad = nacionalidad;
    this.telefono = telefono;
    this.filter = filter;
  }
}
