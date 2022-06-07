import { Modo } from "./Modo";

export interface Submodo {
  submodoId: Number;
  submodoDescricao: string;
  modoId: Number;
  modo: Modo[];
}
