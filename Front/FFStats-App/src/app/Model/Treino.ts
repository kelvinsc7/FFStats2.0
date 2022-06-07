import { Partida } from "./Partida";

export interface Treino {
  treinoId: Number;
  treinoDescricao: string;
  partidas: Partida[];
}
