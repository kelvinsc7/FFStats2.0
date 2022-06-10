import { Jogador } from "./Jogador";
import { Partida } from "./Partida";

export interface PartidaJogador {
  jogadorId: number;
  jogador: Jogador[];
  partidaId: number;
  partida: Partida[];
}
