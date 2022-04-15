export class Cargo {
  _id?: number;
  detalle: string;
  fecha_grabacion: Date;
  fecha_grabacion_string?: string;

  constructor(
    detalle: string,
    fecha_grabacion: Date,
    fecha_grabacion_string: string
  ) {
    this.detalle = detalle;
    this.fecha_grabacion = fecha_grabacion;
    this.fecha_grabacion_string = fecha_grabacion_string;
  }
}
