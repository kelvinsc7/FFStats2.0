import { Component, OnInit } from '@angular/core';
import { Configuracao } from '@app/Model/configuracao';
import { ConfiguracaoService } from '@app/Services/configuracao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {

  configuracoes: Configuracao[] = [];
  configuracao = {} as Configuracao
  isLoading = false;
  constructor(
    private configuracaoService: ConfiguracaoService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadConfiguracoes();
  }
  loadConfiguracoes(): void {
    this.configuracaoService.getConfiguracoes().subscribe(data => {
      this.configuracoes = data;
    });
  }

  toggleAtivo(config: Configuracao): void {
    this.isLoading = true;
    this.spiner.show();
    config.ativo = !config.ativo;
    this.configuracao = config;
    this.configuracaoService.updateConfiguracao(this.configuracao).subscribe(
      () =>this.toaster.success('Configuração Alterada com Sucesso', 'Sucesso!'),
      (error: any) =>{
        console.error(error);
        this.toaster.error('Erro ao alterar a Configuração', 'Error');
        config.ativo = !config.ativo;
      },
    ).add(() =>this.spiner.hide());
    this.isLoading = false;
  }
  
}
