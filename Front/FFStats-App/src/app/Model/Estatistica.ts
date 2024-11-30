import { Jogador } from "./Jogador";
import { Partida } from "./Partida";

export interface Estatistica {
  id: number;
  partidaId: number;
  partida: Partida;
  jogadorId: number;
  jogador: Jogador;
  kill: number;
  morte: number;
  assistencia: number;
  dano: number;
  derrubado: number;
  cura: number;
  levantados: number;
  ressucitou: number;
  tempo: string;
}
