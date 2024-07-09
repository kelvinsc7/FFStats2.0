import { Call } from "./Call";
import { Jogador } from "./Jogador";
import { Partida } from "./Partida";

export interface Mapa {
  id: number;
  mapaNome: string ;
  calls: Call[];
  partida: Partida[]
  melhorJogador: Jogador
}
