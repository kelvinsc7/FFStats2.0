import { Partida } from "./Partida";

export interface Treino {
  treinoId: number;
  treinoDescricao: string;
  partidas: Partida[];
}
