import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mapa } from '../Model/Mapa';

@Injectable(
  //{providedIn: 'root'}
  )
export class MapaService {
  baseURL = 'https://localhost:5001/api/mapa';
  constructor(private http: HttpClient) { }

  getMapas(): Observable<Mapa[]>{
    return this.http.get<Mapa[]>(this.baseURL);
  }
  getMapasByDesc(desc: string): Observable<Mapa[]>{
    return this.http.get<Mapa[]>(`${this.baseURL}/${desc}/descricao`);
  }
  getMapaById(id: number): Observable<Mapa>{
    return this.http.get<Mapa>(`${this.baseURL}/${id}`);
  }

  postMapa(mapa: Mapa): Observable<Mapa>{
    return this.http.post<Mapa>(this.baseURL, mapa);
  }
  putMapa(mapa: Mapa): Observable<Mapa>{
    return this.http.put<Mapa>(`${this.baseURL}/${mapa.id}`, mapa);
  }
  deleteMapa(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
