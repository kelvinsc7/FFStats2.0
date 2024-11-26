import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Partida } from '../Model/Partida';
import { environment } from 'src/environments/environment';

@Injectable(
  //{providedIn: 'root'}
  )
export class PartidaService {
  baseURL = environment.apiBaseUrl+'/api/partida';
  constructor(private http: HttpClient) { }

  getPartidas(): Observable<Partida[]>{
    return this.http.get<Partida[]>(this.baseURL).pipe(take(1));
  }
  getPartidasByDesc(desc: string): Observable<Partida[]>{
    return this.http.get<Partida[]>(`${this.baseURL}/${desc}/descricao`).pipe(take(1));
  }
  getPartidaById(id: number): Observable<Partida>{
    return this.http.get<Partida>(`${this.baseURL}/${id}`).pipe(take(1));
  }
  getPartidaByTreinoId(id: number): Observable<Partida[]>{
    return this.http.get<Partida[]>(`${this.baseURL}/Treino/${id}`).pipe(take(1));
  }
  getPartidaByMapaId(id: number): Observable<Partida[]>{
    return this.http.get<Partida[]>(`${this.baseURL}/${id}/mapa`).pipe(take(1));
  }
  getPartidaByCallId(id: number): Observable<Partida[]>{
    return this.http.get<Partida[]>(`${this.baseURL}/${id}/call`).pipe(take(1));
  }

  postPartida(partida: Partida): Observable<Partida>{
    return this.http.post<Partida>(this.baseURL, partida).pipe(take(1));
  }
  putPartida(partida: Partida): Observable<Partida>{
    return this.http.put<Partida>(`${this.baseURL}/${partida.id}`, partida).pipe(take(1));
  }
  deletePartida(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}
