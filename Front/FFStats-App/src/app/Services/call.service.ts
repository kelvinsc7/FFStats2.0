import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Call } from '../Model/Call';

@Injectable(
  //{providedIn: 'root'}
  )
export class CallService {
  baseURL = 'https://localhost:5001/api/call';
  constructor(private http: HttpClient) { }

  getCalls(): Observable<Call[]>{
    return this.http.get<Call[]>(this.baseURL).pipe(take(1));
  }
  getCallsByDesc(desc: string): Observable<Call[]>{
    return this.http.get<Call[]>(`${this.baseURL}/${desc}/descricao`).pipe(take(1));
  }
  getCallById(id: number): Observable<Call>{
    return this.http.get<Call>(`${this.baseURL}/${id}`).pipe(take(1));
  }
  postCall(call: Call): Observable<Call>{
    return this.http.post<Call>(this.baseURL, call).pipe(take(1));
  }
  putCall(call: Call): Observable<Call>{
    return this.http.put<Call>(`${this.baseURL}/${call.id}`, call).pipe(take(1));
  }
  deleteCall(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}
