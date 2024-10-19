import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Jogador } from '../Model/Jogador';

@Injectable(
  //{providedIn: 'root'}
  )

export class JogadorService {
  baseURL = 'https://localhost:5001/api/Jogador';

  constructor(private http: HttpClient) { }

  public getJogadores(): Observable<Jogador[]>{
    return this.http.get<Jogador[]>(this.baseURL).pipe(take(1));
  }
  public getJogadoresByNome(nome: string): Observable<Jogador[]>{
    return this.http.get<Jogador[]>(`${this.baseURL}/${nome}/descricao`).pipe(take(1));
  }
  public getJogadorById(id: number): Observable<Jogador>{
    return this.http.get<Jogador>(`${this.baseURL}/${id}`).pipe(take(1));
  }
  public getJogadorByUId(id: number): Observable<Jogador>{
    return this.http.get<Jogador>(`${this.baseURL}/'ffInfo'/${id}`).pipe(take(1));
  }
  postJogador(jogador: Jogador): Observable<Jogador>{
    return this.http.post<Jogador>(this.baseURL, jogador).pipe(take(1));
  }
  putJogador(jogador: Jogador): Observable<Jogador>{
    return this.http.put<Jogador>(`${this.baseURL}/${jogador.id}`, jogador).pipe(take(1));
  }
  deleteJogador(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}
