import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Call } from '../Model/Call';

@Injectable(
  //{providedIn: 'root'}
  )
export class CallService {
  baseURL = 'https://localhost:5001/api/call';
  constructor(private http: HttpClient) { }

  getCalls(): Observable<Call[]>{
    return this.http.get<Call[]>(this.baseURL);
  }
  getCallsByDesc(desc: string): Observable<Call[]>{
    return this.http.get<Call[]>(`${this.baseURL}/${desc}/descricao`);
  }
  getCallById(id: number): Observable<Call>{
    return this.http.get<Call>(`${this.baseURL}/${id}`);
  }
  postCall(call: Call): Observable<Call>{
    return this.http.post<Call>(this.baseURL, call);
  }
  putCall(call: Call): Observable<Call>{
    return this.http.put<Call>(`${this.baseURL}/${call.id}`, call);
  }
  deleteCall(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
