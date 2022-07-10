import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Estatistica } from '../Model/Estatistica';

@Injectable(
  //{providedIn: 'root'}
  )
export class EstatisticaService {
  baseURL = 'https://localhost:5001/api/estatisticas';
  constructor(private http: HttpClient) { }

  getEstatisticasByPartidaId(eventoId:number): Observable<Estatistica[]>{
    return this.http.get<Estatistica[]>(`${this.baseURL}/${eventoId}`).pipe(take(1));
  }
  saveEstatistica(partidaId:number, estatistica: Estatistica[]): Observable<Estatistica[]>{
    return this.http.put<Estatistica[]>(`${this.baseURL}/${partidaId}`, estatistica).pipe(take(1));
  }
  deleteEstatistica(partidaID: number, estatisticaId: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${partidaID}/${estatisticaId}`).pipe(take(1));
  }
}
