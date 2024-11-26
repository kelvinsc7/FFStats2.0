import { Mapa } from "./Mapa";
import { Partida } from "./Partida";

export interface Call {
  id: number;
  callCidade: string;
  mapaId: number;
  mapa: Mapa;
  partidas: Partida[]
}
