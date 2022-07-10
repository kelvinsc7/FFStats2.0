import { Jogador } from "./Jogador";

export interface Line {
  id: number;
  lineNome: string;
  jogadores: Jogador[];
}
