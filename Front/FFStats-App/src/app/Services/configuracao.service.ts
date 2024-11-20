import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configuracao } from '@app/Model/configuracao';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {
  private configuracoesSubject = new BehaviorSubject<Configuracao[]>([]);
  configuracoes$ : Observable<Configuracao[]> = this.configuracoesSubject.asObservable();
  private apiUrl = 'https://localhost:5001/api/configuracao';

  constructor(private http: HttpClient) {
    this.loadConfiguracoes()
  }

  loadConfiguracoes() {
    this.http.get<Configuracao[]>(this.apiUrl).subscribe(configs => {
      this.configuracoesSubject.next(configs);
    });
  }
  getConfiguracoes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  refreshConfiguracao(updatedConfig: Configuracao): void {
    const updatedConfigs = this.configuracoesSubject.value.map((c) =>
      c.id === updatedConfig.id ? updatedConfig : c
    );
    this.configuracoesSubject.next(updatedConfigs);
  }

  updateConfiguracao(conf: Configuracao): Observable<any> {
    return this.http.put(`${this.apiUrl}/${conf.id}`, conf);
  }
}
