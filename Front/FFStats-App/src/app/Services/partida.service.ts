import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida } from '../Model/Partida';

@Injectable(
  //{providedIn: 'root'}
  )
export class PartidaService {
  baseURL = 'https://localhost:5001/api/partida';
  constructor(private http: HttpClient) { }

  getPartidas(): Observable<Partida[]>{
    return this.http.get<Partida[]>(this.baseURL);
  }
  getPartidasByDesc(desc: string): Observable<Partida[]>{
    return this.http.get<Partida[]>(`${this.baseURL}/${desc}/descricao`);
  }
  getPartidaById(id: number): Observable<Partida>{
    return this.http.get<Partida>(`${this.baseURL}/${id}`);
  }
  getPartidaByMapaId(id: number): Observable<Partida>{
    return this.http.get<Partida>(`${this.baseURL}/${id}/mapa`);
  }

  postPartida(partida: Partida): Observable<Partida>{
    return this.http.post<Partida>(this.baseURL, partida);
  }
  putPartida(partida: Partida): Observable<Partida>{
    return this.http.put<Partida>(`${this.baseURL}/${partida.id}`, partida);
  }
  deletePartida(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
