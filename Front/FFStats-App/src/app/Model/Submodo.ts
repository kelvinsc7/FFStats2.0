import { Modo } from "./Modo";

export interface Submodo {
  id: number;
  submodoDescricao: string;
  modoId: number;
  modo: Modo[];
}
