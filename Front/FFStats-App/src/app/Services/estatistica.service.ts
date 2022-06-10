import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estatistica } from '../Model/Estatistica';

@Injectable(
  //{providedIn: 'root'}
  )
export class EstatisticaService {
  baseURL = 'https://localhost:5001/api/estatisticas';
  constructor(private http: HttpClient) { }

  getEstatisticas(): Observable<Estatistica[]>{
    return this.http.get<Estatistica[]>(this.baseURL);
  }
  getEstatisticasByDesc(desc: string): Observable<Estatistica[]>{
    return this.http.get<Estatistica[]>(`${this.baseURL}/${desc}/descricao`);
  }
  getEstatisticaById(id: number): Observable<Estatistica>{
    return this.http.get<Estatistica>(`${this.baseURL}/${id}`);
  }
}
