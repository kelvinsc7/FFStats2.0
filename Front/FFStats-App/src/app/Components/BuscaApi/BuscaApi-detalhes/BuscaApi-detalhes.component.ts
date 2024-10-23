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
    private toastr: ToastrService
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
        this.toastr.error("Erro ao carregar estatísticas do jogador", "Erro!");
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
        this.toastr.error("Erro ao carregar estatísticas do jogador", "Erro!");
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
  calculaKD(kill: number, mortes: number): number {
	if (!mortes) {
	  return 0; // Caso mortes seja 0 ou NaN, retorna 0.
	}
	const kd = kill / mortes;
	return isNaN(kd) ? 0 : parseFloat(kd.toFixed(2)); // Arredonda para 2 casas decimais e verifica se é NaN.
  }
  calculaPercentT3(top3:number, partidas:number): number{
	if (!partidas) {
		return 0; // Caso mortes seja 0 ou NaN, retorna 0.
	  }
	  const percent = (top3*100)/partidas
	  return isNaN(percent) ? 0 : parseFloat(percent.toFixed(2)); // Arredonda para 2 casas decimais e verifica se é NaN.
  }
  calculaDistanciaTotal(distancia:number):number{
	const km =  distancia/1000;
	return isNaN(km) ? 0 : parseFloat(km.toFixed(2)); // Arredonda para 2 casas decimais e verifica se é NaN.
  }
  calculaMediaDistancia(distancia:number, partida:number):number{
	const km = (distancia/partida)/1000;
	return isNaN(km) ? 0 : parseFloat(km.toFixed(2));
  }
  calculaTempoMedio(tempo:number, partida:number):string{
	if(!tempo){
		return "00:00"
	}
	const minutosGeral = (tempo/partida) / 60;
	const minutos = Math.floor(minutosGeral);
	const secondsGeral = minutosGeral - minutos
	var seconds = Math.floor((secondsGeral * 60) / 1)

	return minutos.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
	
  }
  calculaTempoTotal(tempo:number):string{
    if(!tempo){
      return "00:00"
    }
    const hours = Math.floor(tempo / 3600); // Calcula o total de horas
    const minutes = Math.floor((tempo % 3600) / 60); // Calcula o total de minutos
    const remainingSeconds = tempo % 60; // Calcula o total de segundos restantes

    // Formatar para o padrão HH:MM:SS, preenchendo com 0 à esquerda quando necessário
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    
  }
  calculaMediaDano(dano:number, partida:number):number{
    if(!dano){
      return 0;
    }
    const mediaDano = dano / partida;
    return isNaN(mediaDano)? 0: parseFloat(mediaDano.toFixed(2))
  }
  calculaTaxaHs(kilCapa:number, kills:number):number{
    if(!kills){
      return 0;
    }
    const taxaHs = (kilCapa *100) / kills
    return isNaN(taxaHs)? 0:parseFloat(taxaHs.toFixed(2))
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
