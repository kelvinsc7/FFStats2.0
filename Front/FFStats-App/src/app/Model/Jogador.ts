import { Partida } from "./Partida";

export interface Jogador {
  id: number;
  jogadorNome: string;
  jogadorNick: string;
  partidasJogadores: Partida[];
}
