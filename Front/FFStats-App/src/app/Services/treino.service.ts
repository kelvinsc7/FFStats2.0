import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Treino } from '../Model/Treino';

@Injectable(
  //{providedIn: 'root'}
)
export class TreinoService {
  baseURL = 'https://localhost:5001/api/Treino';
  constructor(private http: HttpClient) { }

  getTreinos(): Observable<Treino[]>{
    return this.http.get<Treino[]>(this.baseURL).pipe(take(1));
  }
  getTreinosByDesc(desc: string): Observable<Treino[]>{
    return this.http.get<Treino[]>(`${this.baseURL}/${desc}/descricao`).pipe(take(1));
  }
  getTreinoById(id: number): Observable<Treino>{
    return this.http.get<Treino>(`${this.baseURL}/${id}`).pipe(take(1));
  }
  postTreino(treino: Treino): Observable<Treino>{
    return this.http.post<Treino>(this.baseURL, treino).pipe(take(1));
  }
  putTreino(treino: Treino): Observable<Treino>{
    return this.http.put<Treino>(`${this.baseURL}/${treino.id}`, treino).pipe(take(1));
  }
  deleteTreino(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}
