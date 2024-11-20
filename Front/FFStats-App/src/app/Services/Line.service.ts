import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Line } from '@app/Model/Line';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LineService {
  baseURL = environment.apiBaseUrl+'/api/line';
  constructor(private http: HttpClient) { }
  getLines(): Observable<Line[]>{
    return this.http.get<Line[]>(this.baseURL).pipe(take(1));
  }
  getLinesByDesc(desc: string): Observable<Line[]>{
    return this.http.get<Line[]>(`${this.baseURL}/${desc}/descricao`).pipe(take(1));
  }
  getLineById(id: number): Observable<Line>{
    return this.http.get<Line>(`${this.baseURL}/${id}`).pipe(take(1));
  }
  postLine(line: Line): Observable<Line>{
    return this.http.post<Line>(this.baseURL, line).pipe(take(1));
  }
  putLine(line: Line): Observable<Line>{
    return this.http.put<Line>(`${this.baseURL}/${line.id}`, line).pipe(take(1));
  }
  deleteLine(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}
