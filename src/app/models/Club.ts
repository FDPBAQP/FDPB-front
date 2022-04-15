export class Club {
  _id?: string;
  detalle: any;
  detalletxt?: any;
  tipo: any;
  fecha_grabacion: any;
  fecha_grabacion_string?: string;

  constructor(
    detalle: string,
    detalletxt: string,
    tipo: any,
    fecha_grabacion: any,
    fecha_grabacion_string: string
  ) {
    this.detalle = detalle;
    this.detalletxt = detalletxt;
    this.tipo = tipo;
    this.fecha_grabacion = fecha_grabacion;
    this.fecha_grabacion_string = fecha_grabacion_string;
  }
}
