import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modo } from '../Model/Modo';

@Injectable(
  //{providedIn: 'root'}
  )
export class ModoService {
  baseURL = 'https://localhost:5001/api/modo';
  constructor(private http: HttpClient) { }

  getModos(): Observable<Modo[]>{
    return this.http.get<Modo[]>(this.baseURL);
  }
  getModosByDesc(desc: string): Observable<Modo[]>{
    return this.http.get<Modo[]>(`${this.baseURL}/${desc}/descricao`);
  }
  getModoById(id: number): Observable<Modo>{
    return this.http.get<Modo>(`${this.baseURL}/${id}`);
  }
  postModo(modo: Modo): Observable<Modo>{
    return this.http.post<Modo>(this.baseURL, modo);
  }
  putModo(modo: Modo): Observable<Modo>{
    return this.http.put<Modo>(`${this.baseURL}/${modo.id}`, modo);
  }
  deleteModo(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
