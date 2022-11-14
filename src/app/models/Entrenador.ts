export class Entrenador {
  _id?: number;
  dni: string;
  club: string;
  apellidos: string;
  nombres: string;
  nacionalidad: string;
  telefono: string;
  filter?: string;
  clubDetalle?: string;

  constructor(
    dni: string,
    club: string,
    apellidos: string,
    nombres: string,
    nacionalidad: string,
    telefono: string,
    filter: string,
    clubDetalle: string
  ) {
    this.dni = dni;
    this.club = club;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.nacionalidad = nacionalidad;
    this.telefono = telefono;
    this.filter = filter;
    this.clubDetalle = clubDetalle;
  }
}
