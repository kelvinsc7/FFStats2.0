import { Mapa } from "./Mapa";

export interface Call {
  id: number;
  callCidade: string;
  mapaId: number;
  mapa: Mapa;
}
