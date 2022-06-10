import { Jogador } from "./Jogador";
import { Partida } from "./Partida";

export interface Estatistica {
  id: number;
  partidaId: number;
  partida: Partida[];
  jogadorId: number;
  jogador: Jogador[];
  kill: number;
  dano: number;
  tempo: number;
  assistencia: number;
  ressucitado: number;
  salvador: number;
}
