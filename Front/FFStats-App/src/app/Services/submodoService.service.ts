import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Submodo } from '@app/Model/Submodo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmodoService {
  baseURL = 'https://localhost:5001/api/submodo';
  constructor(private http: HttpClient) { }

  getSubModos(): Observable<Submodo[]>{
    return this.http.get<Submodo[]>(this.baseURL);
  }
  getSubModosByDesc(desc: string): Observable<Submodo[]>{
    return this.http.get<Submodo[]>(`${this.baseURL}/${desc}/descricao`);
  }
  getSubModoById(id: number): Observable<Submodo>{
    return this.http.get<Submodo>(`${this.baseURL}/${id}`);
  }
  postSubmodo(submodo: Submodo): Observable<Submodo>{
    return this.http.post<Submodo>(this.baseURL, submodo);
  }
  putSubmodo(submodo: Submodo): Observable<Submodo>{
    return this.http.put<Submodo>(`${this.baseURL}/${submodo.submodoId}`, submodo);
  }
  deleteSubmodo(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
