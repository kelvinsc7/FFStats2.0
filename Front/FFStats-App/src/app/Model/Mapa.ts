import { Partida } from './Partida';
import { Call } from "./Call";

export interface Mapa {
  id: number;
  mapaNome: string ;
  calls: Call[];
  partidas: Partida[];
}
