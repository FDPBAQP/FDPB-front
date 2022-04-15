export class Jugador {
  _id?: number;
  cedula?: string;
  dni?: string;
  libro?: string;
  folio?: string;
  club?: any;
  apellidos?: string;
  nombres?: string;
  fecha_nacimiento?: Date;
  categoria?: string;
  ciudad_nacimiento?: string;
  nacionalidad?: string;
  fecha_inscripcion?: Date;

  constructor(
    cedula: string,
    dni: string,
    libro: string,
    folio: string,
    club: [detalle: any],
    apellidos: string,
    nombres: string,
    fecha_nacimiento: Date,
    categoria: string,
    ciudad_nacimiento: string,
    nacionalidad: string,
    fecha_inscripcion: Date
  ) {
    this.cedula = cedula;
    this.dni = dni;
    this.libro = libro;
    this.folio = folio;
    this.club = club;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.fecha_nacimiento = fecha_nacimiento;
    this.categoria = categoria;
    this.ciudad_nacimiento = ciudad_nacimiento;
    this.nacionalidad = nacionalidad;
    this.fecha_inscripcion = fecha_inscripcion;
  }
}
