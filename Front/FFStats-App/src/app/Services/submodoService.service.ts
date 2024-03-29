import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Submodo } from '@app/Model/Submodo';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmodoService {
  baseURL = 'https://localhost:5001/api/submodo';
  constructor(private http: HttpClient) { }

  getSubModos(): Observable<Submodo[]>{
    return this.http.get<Submodo[]>(this.baseURL).pipe(take(1));
  }
  getSubModosByDesc(desc: string): Observable<Submodo[]>{
    return this.http.get<Submodo[]>(`${this.baseURL}/${desc}/descricao`).pipe(take(1));
  }
  getSubModoById(id: number): Observable<Submodo>{
    return this.http.get<Submodo>(`${this.baseURL}/${id}`).pipe(take(1));
  }
  getSubModoByModoId(modoId: number): Observable<Submodo[]>{
    return this.http.get<Submodo[]>(`${this.baseURL}/${modoId}/modo`).pipe(take(1));
  }
  postSubmodo(submodo: Submodo): Observable<Submodo>{
    return this.http.post<Submodo>(this.baseURL, submodo).pipe(take(1));
  }
  putSubmodo(submodo: Submodo): Observable<Submodo>{
    return this.http.put<Submodo>(`${this.baseURL}/${submodo.id}`, submodo).pipe(take(1));
  }
  deleteSubmodo(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }
}
