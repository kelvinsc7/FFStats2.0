import { Jogador } from "./Jogador";
import { Partida } from "./Partida";

export interface PartidaJogador {
  jogadorId: Number;
  jogador: Jogador[];
  partidaId: Number;
  partida: Partida[];
}
