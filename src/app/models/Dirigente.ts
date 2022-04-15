export class Dirigente {
  _id?: number;
  dni: string;
  club: string;
  cargo: string;
  apellidos: string;
  nombres: string;
  telefono: string;

  constructor(
    dni: string,
    club: string,
    cargo: string,
    apellidos: string,
    nombres: string,
    telefono: string
  ) {
    this.dni = dni;
    this.club = club;
    this.cargo = cargo;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.telefono = telefono;
  }
}
