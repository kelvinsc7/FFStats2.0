import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuracao } from '@app/Model/configuracao';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {
  private apiUrl = 'https://localhost:5001/api/configuracao';

  constructor(private http: HttpClient) {}

  getConfiguracoes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateConfiguracao(conf: Configuracao): Observable<any> {
    return this.http.put(`${this.apiUrl}/${conf.id}`, conf);
  }
}
