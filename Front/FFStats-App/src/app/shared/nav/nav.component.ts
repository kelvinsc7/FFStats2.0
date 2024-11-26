import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracao } from '@app/Model/configuracao';
import { ConfiguracaoService } from '@app/Services/configuracao.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed = true;
  public showBuscaApi: boolean = true;
  constructor(
    private router : Router,
    private configuracaoService: ConfiguracaoService,
  ) { }

  ngOnInit():void {
    this.loadConfiguracoes();
  }
  loadConfiguracoes(): void {
    this.configuracaoService.configuracoes$.subscribe(data => {
      const ffestatisticas = data.find(c => c.nome === 'API FFEstatisticas');
      const ffinfo = data.find(c => c.nome === 'API FFInfo');
      if (ffestatisticas && ffinfo && ffestatisticas.ativo === false && ffinfo.ativo === false) {
        this.showBuscaApi = false;
      } else {
        this.showBuscaApi = true;
      }
    });
  }
  showMenu(): boolean{
    return this.router.url !== '/user/login' && this.router.url !== '/user/registration';
  }
}
