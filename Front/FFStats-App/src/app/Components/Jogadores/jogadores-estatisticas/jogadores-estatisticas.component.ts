import { Component,Input, OnInit } from '@angular/core';
import { Estatistica } from '@app/Model/Estatistica';
import { EstatisticaService } from '@app/Services/estatistica.service';

@Component({
  selector: 'app-jogadores-estatisticas',
  templateUrl: './jogadores-estatisticas.component.html',
  styleUrls: ['./jogadores-estatisticas.component.scss']
})
export class JogadoresEstatisticasComponent implements OnInit {
  @Input() jogadorId!: number;
  estatistica : Estatistica[] = [];
  partidas: number 
  kills:number
  booyah:number
  mortes:number
  Kd:number
  danoTotal:number
  danoMedio:number
  percenteBooyah:number
  topT:number
  percentTopT:number
  derubados:number
  maximoKill:number
  tempoTotal:string
  tempoMedio:string
  reviveu:number

  constructor(private estatisticaService: EstatisticaService) { }

  ngOnInit() {
    this.carregarEstatisticas();
  }
  private carregarEstatisticas(): void {
    if (this.jogadorId) {
      this.estatisticaService.getEstatisticasByJogadorId(this.jogadorId).subscribe({
        next: (estatisticas: Estatistica[]) => {
          this.estatistica = estatisticas;
          this.calculaEstatisticas()
        },
        error: (error: any) => {
          console.error('Erro ao carregar estatísticas de treino:', error);
        }
      });
    }
  }
  calculaEstatisticas():void{
    this.somaPartida();
    this.somaKills();
    this.somaBooyah();
    this.somaMortes();
    this.calculaKd();
    this.somaDano();
    this.calculaTop3();
    this.somaDerubados();
    this.calculaMaximoKill();
    this.calculaTempo();
    this.calculaReviveu();
  }
  somaPartida():void{
    if(!this.estatistica || this.estatistica.length ==0)
      this.partidas = 0
    this.partidas =  this.estatistica.length
  }
  somaKills(): void{
    let totalKill = 0
    if(!this.estatistica || this.estatistica.length ==0)
      this.kills = totalKill
    this.estatistica.forEach(e=> {totalKill += e.kill;})
    this.kills = totalKill
  }
  somaBooyah():void{
    if(!this.estatistica || this.estatistica.length ==0)
      this.booyah = 0;
    this.booyah = this.estatistica.filter(estatistica => estatistica.partida?.posicao === 1).length;

    this.percenteBooyah = parseFloat((this.booyah *100 / this.partidas).toFixed(2))

  }
  somaMortes():void{
    let totalmortes = 0
    if(!this.estatistica || this.estatistica.length ==0)
      this.mortes = 0
    this.estatistica.forEach(e=> {totalmortes += e.morte;})
    this.mortes = totalmortes;
  }
  calculaKd():void{
    this.Kd =  parseFloat((this.kills/this.mortes).toFixed(2))
  }
  somaDano():void{
    let totaldano = 0
    this.estatistica.forEach(e=> { totaldano +=e.dano})
    this.danoTotal = totaldano
    this.danoMedio = parseFloat((this.danoTotal/this.partidas).toFixed(2))
  }
  calculaTop3():void{
    this.topT = this.estatistica.filter(e=>e.partida.posicao <= 3).length
    this.percentTopT = parseFloat((this.topT *100 / this.partidas).toFixed(2))
  }
  somaDerubados():void{
    let totalDerrubados = 0
    this.estatistica.forEach(e=> { totalDerrubados += e.derrubado})
    this.derubados = totalDerrubados
  }
  calculaMaximoKill():void{

  }
  calculaTempo():void{

  }
  calculaReviveu():void{
    let totalReviveu = 0
    this.estatistica.forEach(e=>{ totalReviveu+=e.ressucitou})
    this.reviveu = totalReviveu
  }

}
