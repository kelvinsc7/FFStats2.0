import { Partida } from "./Partida";

export interface Treino {
  id: number;
  treinoDescricao: string;
  partidas: Partida[];
}
