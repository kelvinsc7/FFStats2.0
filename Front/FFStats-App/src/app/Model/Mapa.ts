import { Partida } from './Partida';
import { Call } from "./Call";
import { Jogador } from "./Jogador";


export interface Mapa {
  id: number;
  mapaNome: string ;
  calls: Call[];
  partidas: Partida[];
}
