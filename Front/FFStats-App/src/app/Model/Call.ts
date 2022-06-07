import { Mapa } from "./Mapa";

export interface Call {
  id: Number;
  callCidade: string;
  mapaId: Number;
  mapa: Mapa;
}
