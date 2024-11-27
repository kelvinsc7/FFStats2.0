import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jogador } from '@app/Model/Jogador';
import { Line } from '@app/Model/Line';
import { JogadorService } from '@app/Services/jogador.service';
import { LineService } from '@app/Services/Line.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracaoService } from '@app/Services/configuracao.service';
import { PlayerData } from '@app/Model/PlayerData';
import { PlayerStats } from '@app/Model/PlayerStats';

@Component({
  selector: 'app-jogadores-detalhes',
  templateUrl: './jogadores-detalhes.component.html',
  styleUrls: ['./jogadores-detalhes.component.scss']
})
export class JogadoresDetalhesComponent implements OnInit {

  jogador={} as Jogador;
  player={} as PlayerData;
  form!:FormGroup;
  modeSave = 'postJogador'
  lines: Line[] = [];
  isLoading=false;
  ffEstatisticasAtivo:boolean = true;
  ffinfoAtivo:Boolean = true;
  validaJogador  = false;
  validaStats  = false;
  jogadorBd ={} as Jogador; 
  playerStats  = {} as PlayerStats;
  activeTab: string = 'solo';

  get f():any{return this.form.controls;}

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private jogadorService: JogadorService,
              private lineService: LineService,
              private spiner: NgxSpinnerService,
              private toaster: ToastrService,
              private configuracaoService: ConfiguracaoService,
            ) { }

  public carregaDados():void{
    const dadosIdParam = this.router.snapshot.paramMap.get('id');

    if(dadosIdParam!== null)
    {
      this.spiner.show();

      this.modeSave = 'putJogador'

      this.jogadorService.getJogadorById(+dadosIdParam).subscribe(
        (jogador: Jogador)=>{
          this.jogador = {...jogador};
          this.form.patchValue(this.jogador);
          this.BuscarJogador(String(this.jogador.idJogo))
        },
        ()=>{
          console.error(Error);
        },
      ).add(()=>this.spiner.hide())
    }
  }
  public getLine():void{
    this.lineService.getLines().subscribe(
      (line: Line[]) =>{
        this.lines = line
      },
      (error: any)=>{
      }
    )
  }

  ngOnInit(): void {
    this.carregaDados();
    this.getLine();
    this.validation();
  }

  public validation():void{
    this.form = this.fb.group({
      jogadorNome: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      jogadorNick: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      idJogo: ['',[ Validators.minLength(4),Validators.maxLength(10)]],
      lineId: ['',[]],
    });
  }

  public resetForm():void{this.form.reset();}

  public salvarAlteracao():void{
    this.isLoading = true;
    this.spiner.show();
    if(this.form.valid)
    {
      this.jogador =  (this.modeSave === 'postJogador')
                      ? {... this.form.value}
                      : {id: this.jogador.id,... this.form.value}

        this.jogadorService[this.modeSave](this.jogador).subscribe(
        () =>this.toaster.success('Jogador Salva com Sucesso', 'Sucesso!'),
        (error: any) =>{
          console.error(error);
          this.toaster.error('Erro ao salvar a Jogador', 'Error');
        },

    ).add(() =>this.spiner.hide());

    }
    this.isLoading = false;
  }

  //Partes da API externa
  public BuscarJogador(playerId: string):void{
    this.spiner.show()
    this.configuracaoService.configuracoes$.subscribe(data => {
      const ffestatisticas = data.find(c => c.nome === 'API FFEstatisticas');
      const ffinfo = data.find(c => c.nome === 'API FFInfo');
      this.ffEstatisticasAtivo = ffestatisticas.ativo;
      this.ffinfoAtivo = ffinfo.ativo;
    });
    if(this.ffinfoAtivo)
    {
      this.jogadorService.getJogadorByUId(parseInt(playerId)).subscribe(
        (jogador: PlayerData)=>{
          this.player = {...jogador};
          this.player.accountCreateTime = this.convertToBrasiliaTime(this.player.accountCreateTime)
          this.player.accountLastLogin = this.convertToBrasiliaTime(this.player.accountLastLogin)
          this.validaJogador = true
        },
        ()=>{
          console.error(Error);
          this.validaJogador = false
          this.toaster.error("Erro ao carregar estatísticas do jogador", "Erro!");
        },
      ).add(()=>this.spiner.hide());
      this.jogadorService.getJogadorByIdJogo(parseInt(playerId)).subscribe(
        (jogador: Jogador)=>{
          this.jogadorBd = {...jogador};
          if(this.jogadorBd.idJogo){
            this.modeSave = 'putJogador'
          }
          this.jogadorBd.jogadorNick = this.player.accountName;
        },
        ()=>{
          this.modeSave = 'postJogador'
        },
      )
    }
    if(this.ffEstatisticasAtivo)
    {
      this.jogadorService.getJogadorByUId2(parseInt(playerId)).subscribe(
        (estatistica : PlayerStats)=>{
          this.playerStats  = {...estatistica};
          this.validaStats = true
        },
        ()=>{
          console.error(Error);
          this.validaStats = false
          this.toaster.error("Erro ao carregar estatísticas do jogador", "Erro!");
        },
      ).add(()=>this.spiner.hide());
    }
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
  classificaRanqueada(points: number): string {
    if (points >= 9800) return "Elite V";
    else if (points >= 8700) return "Elite IV";
    else if (points >= 7700) return "Elite III";
    else if (points >= 6800) return "Elite II";
    else if (points >= 6000) return "Elite I";
    else if (points >= 4850) return "Mestre V";
    else if (points >= 4350) return "Mestre IV";
    else if (points >= 4000) return "Mestre III";
    else if (points >= 3500) return "Mestre II";
    else if (points >= 3200) return "Mestre I";
    else if (points >= 3050) return "Diamante IV";
    else if (points >= 2900) return "Diamante III";
    else if (points >= 2750) return "Diamante II";
    else if (points >= 2600) return "Diamante I";
    else if (points >= 2475) return "Platina IV";
    else if (points >= 2350) return "Platina III";
    else if (points >= 2225) return "Platina II";
    else if (points >= 2100) return "Platina I";
    else if (points >= 1975) return "Ouro IV";
    else if (points >= 1850) return "Ouro III";
    else if (points >= 1725) return "Ouro II";
    else if (points >= 1600) return "Ouro I";
    else if (points >= 1500) return "Prata III";
    else if (points >= 1400) return "Prata II";
    else if (points >= 1300) return "Prata I";
    else if (points >= 1200) return "Bronze III";
    else if (points >= 1100) return "Bronze II";
    else  return "Bronze I";
  }
  classificaCSRanqueada(points: number): string {
    if (points >= 180) return "Elite V";
    else if (points >= 165) return "Elite IV";
    else if (points >= 150) return "Elite III";
    else if (points >= 135) return "Elite II";
    else if (points >= 115) return "Elite I";
    else if (points >= 106) return "Mestre V";
    else if (points >= 96) return "Mestre IV";
    else if (points >= 90) return "Mestre III";
    else if (points >= 76) return "Mestre II";
    else if (points >= 75) return "Mestre I";
    else if (points >= 70) return "Diamante IV";
    else if (points >= 65) return "Diamante III";
    else if (points >= 60) return "Diamante II";
    else if (points >= 55) return "Diamante I";
    else if (points >= 50) return "Platina IV";
    else if (points >= 45) return "Platina III";
    else if (points >= 40) return "Platina II";
    else if (points >= 35) return "Platina I";
    else if (points >= 31) return "Ouro IV";
    else if (points >= 27) return "Ouro III";
    else if (points >= 23) return "Ouro II";
    else if (points >= 19) return "Ouro I";
    else if (points >= 16) return "Prata III";
    else if (points >= 13) return "Prata II";
    else if (points >= 10) return "Prata I";
    else if (points >= 7) return "Bronze III";
    else if (points >= 4) return "Bronze II";
    else return "Bronze I";
  }
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
