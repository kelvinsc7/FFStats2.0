import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from '../Model/Jogador';

@Injectable(
  //{providedIn: 'root'}
  )

export class JogadorService {
  baseURL = 'https://localhost:5001/api/Jogador';

  constructor(private http: HttpClient) { }

  public getJogadores(): Observable<Jogador[]>{
    return this.http.get<Jogador[]>(this.baseURL);
  }
  public getJogadoresByNome(nome: string): Observable<Jogador[]>{
    return this.http.get<Jogador[]>(`${this.baseURL}/${nome}/descricao`);
  }
  public getJogadorById(id: number): Observable<Jogador>{
    return this.http.get<Jogador>(`${this.baseURL}/${id}`);
  }
  postJogador(jogador: Jogador): Observable<Jogador>{
    return this.http.post<Jogador>(this.baseURL, jogador);
  }
  putJogador(jogador: Jogador): Observable<Jogador>{
    return this.http.put<Jogador>(`${this.baseURL}/${jogador.id}`, jogador);
  }
  deleteJogador(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
