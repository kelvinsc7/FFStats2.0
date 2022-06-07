import { Submodo } from "./Submodo";

export interface Modo {
  id: Number;
  modoDescricao: string;
  subModos: Submodo[];
}
