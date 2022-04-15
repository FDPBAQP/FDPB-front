export class Categoria {
  _id?: number;
  detalle: string;
  desde: number;
  hasta: number;

  constructor(detalle: string, desde: number, hasta: number) {
    this.detalle = detalle;
    this.desde = desde;
    this.hasta = hasta;
  }
}
