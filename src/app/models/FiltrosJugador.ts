export class FiltrosJugador {
  club?: string;
  categoria?: string;

  constructor(club: string, categoria: string) {
    this.club = club;
    this.categoria = categoria;
  }
}
