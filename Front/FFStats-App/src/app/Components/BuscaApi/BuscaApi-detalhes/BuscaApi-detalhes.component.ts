import { Component, OnInit } from '@angular/core';
import { PlayerData } from '@app/Model/PlayerData';
import { JogadorService } from '@app/Services/jogador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PlayerStats } from '@app/Model/PlayerStats';

@Component({
  selector: 'app-BuscaApi-detalhes',
  templateUrl: './BuscaApi-detalhes.component.html',
  styleUrls: ['./BuscaApi-detalhes.component.scss']
})
export class BuscaApiDetalhesComponent implements OnInit {

  jogador={} as PlayerData;
  playerStats  = {} as PlayerStats;
  validaJogador  = false;
  validaStats  = false;
  activeTab: string = 'solo';

  constructor(
    private JogadorService : JogadorService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }
    public BuscarJogador(playerId: string):void{
    this.spiner.show()
    this.JogadorService.getJogadorByUId(parseInt(playerId)).subscribe(
      (jogador: PlayerData)=>{
        this.jogador = {...jogador};
        this.jogador.accountCreateTime = this.convertToBrasiliaTime(this.jogador.accountCreateTime)
        this.jogador.accountLastLogin = this.convertToBrasiliaTime(this.jogador.accountLastLogin)
        this.validaJogador = true
      },
      ()=>{
        console.error(Error);
        this.validaJogador = false
      },
    ).add(()=>this.spiner.hide());
    



    this.JogadorService.getJogadorByUId2(parseInt(playerId)).subscribe(
      (estatistica : PlayerStats)=>{
        this.playerStats  = {...estatistica};
        this.validaStats = true
      },
      ()=>{
        console.error(Error);
        this.validaStats = false
      },
    ).add(()=>this.spiner.hide());

  }
  convertToBrasiliaTime(dateString: string): string {
    // Cria um objeto Date a partir da string de data como GMT-0530
    const date = new Date(dateString + ' GMT-0030'); // Assume que a string está em GMT-0530 e converte para GMT

    // Ajusta a data para o horário de Brasília
    // Brasília está 3 horas atrás do GMT
    const brasiliaOffset = -3 * 60; // Offset em minutos
    const utcOffset = date.getTimezoneOffset(); // Offset da data original em minutos

    // Ajusta a data para Brasília
    const brasiliaDate = new Date(date.getTime() + (brasiliaOffset - utcOffset) * 60 * 1000);

    // Formata a data
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Formato 24 horas
    };

    // Retorna a string formatada
    return brasiliaDate.toLocaleString('pt-BR', options);
  
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
