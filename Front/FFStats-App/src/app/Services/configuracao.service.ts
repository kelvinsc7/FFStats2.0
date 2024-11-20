import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configuracao } from '@app/Model/configuracao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {
  private configuracoesSubject = new BehaviorSubject<Configuracao[]>([]);
  configuracoes$ : Observable<Configuracao[]> = this.configuracoesSubject.asObservable();
  baseURL = environment.apiBaseUrl+'/api/configuracao';

  constructor(private http: HttpClient) {
    this.loadConfiguracoes()
  }

  loadConfiguracoes() {
    this.http.get<Configuracao[]>(this.baseURL).subscribe(configs => {
      this.configuracoesSubject.next(configs);
    });
  }
  getConfiguracoes(): Observable<any> {
    return this.http.get<any>(this.baseURL);
  }
  refreshConfiguracao(updatedConfig: Configuracao): void {
    const updatedConfigs = this.configuracoesSubject.value.map((c) =>
      c.id === updatedConfig.id ? updatedConfig : c
    );
    this.configuracoesSubject.next(updatedConfigs);
  }

  updateConfiguracao(conf: Configuracao): Observable<any> {
    return this.http.put(`${this.baseURL}/${conf.id}`, conf);
  }
}
