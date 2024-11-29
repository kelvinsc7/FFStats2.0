import { Call } from "./Call";
import { Estatistica } from "./Estatistica";
import { Jogador } from "./Jogador";
import { Mapa } from "./Mapa";
import { Modo } from "./Modo";
import { Submodo } from "./Submodo";
import { Treino } from "./Treino";

export interface Partida {

  id: number;
  partidaDescricao: string;
  treinoId: number;
  treino: Treino;
  mapaId: number;
  mapa: Mapa;
  callId: number;
  call: Call;
  modoId: number;
  modo: Modo;
  submodoId: number;
  sumodo: Submodo;
  partidaData?: Date;
  posicao: number;
  partidasJogadores: Jogador[];
  estatisticas: Estatistica[];
  MVP: string

}
