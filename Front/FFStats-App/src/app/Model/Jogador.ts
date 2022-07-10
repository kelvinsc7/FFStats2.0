import { Line } from "./Line";
import { Partida } from "./Partida";

export interface Jogador {
  id: number;
  jogadorNome: string;
  jogadorNick: string;
  idJogo: number;
  lineId: number;
  line: Line;
  partidasJogadores: Partida[];
}
