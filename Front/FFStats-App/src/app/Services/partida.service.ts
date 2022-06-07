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

}
