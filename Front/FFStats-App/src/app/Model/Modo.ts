import { Submodo } from "./Submodo";

export interface Modo {
  id: number;
  modoDescricao: string;
  subModos: Submodo[];
}
