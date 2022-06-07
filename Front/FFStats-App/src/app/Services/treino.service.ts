import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treino } from '../Model/Treino';

@Injectable(
  //{providedIn: 'root'}
)
export class TreinoService {
  baseURL = 'https://localhost:5001/api/Treino';
  constructor(private http: HttpClient) { }

  getTreinos(): Observable<Treino[]>{
    return this.http.get<Treino[]>(this.baseURL);
  }
  getTreinosByDesc(desc: string): Observable<Treino[]>{
    return this.http.get<Treino[]>(`${this.baseURL}/${desc}/descricao`);
  }
  getTreinoById(id: number): Observable<Treino>{
    return this.http.get<Treino>(`${this.baseURL}/${id}`);
  }

}
