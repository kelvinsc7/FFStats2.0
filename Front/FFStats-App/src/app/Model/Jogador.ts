import { Partida } from "./Partida";

export interface Jogador {
  id: Number;
  jogadorNome: string;
  jogadorNick: string;
  partidasJogadores: Partida[];
}
