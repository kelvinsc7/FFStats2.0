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

}
