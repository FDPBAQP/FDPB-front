export class Dirigente {
  _id?: number;
  dni: string;
  club: string;
  cargo: string;
  apellidos: string;
  nombres: string;
  telefono: string;
  filter?: string;
  clubDetalle?: string;

  constructor(
    dni: string,
    club: string,
    cargo: string,
    apellidos: string,
    nombres: string,
    telefono: string,
    filter: string,
    clubDetalle: string
  ) {
    this.dni = dni;
    this.club = club;
    this.cargo = cargo;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.telefono = telefono;
    this.filter = filter;
    this.clubDetalle = clubDetalle;
  }
}
