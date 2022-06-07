import { Jogador } from "./Jogador";
import { Partida } from "./Partida";

export interface Estatistica {
  id: Number;
  partidaId: Number;
  partida: Partida[];
  jogadorId: Number;
  jogador: Jogador[];
  kill: Number;
  dano: Number;
  tempo: Number;
  assistencia: Number;
  ressucitado: Number;
  salvador: Number;
}
