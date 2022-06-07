import { Call } from "./Call";
import { Estatistica } from "./Estatistica";
import { Jogador } from "./Jogador";
import { Mapa } from "./Mapa";
import { Modo } from "./Modo";
import { Submodo } from "./Submodo";
import { Treino } from "./Treino";

export interface Partida {

  id: Number;
  partidaDescricao: string;
  treinoId: Number;
  treino: Treino;
  mapaId: Number;
  mapa: Mapa;
  callId: Number;
  call: Call;
  modoId: Number;
  modo: Modo;
  submodoId: Number;
  sumodo: Submodo;
  partidaData?: Date;
  posicao: Number;
  partidasJogadores: Jogador[];
  estatisticas: Estatistica[];

}
