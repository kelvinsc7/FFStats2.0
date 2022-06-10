import { Modo } from "./Modo";

export interface Submodo {
  submodoId: number;
  submodoDescricao: string;
  modoId: number;
  modo: Modo[];
}
