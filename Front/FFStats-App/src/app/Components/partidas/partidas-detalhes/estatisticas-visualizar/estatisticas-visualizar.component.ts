import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estatistica } from '@app/Model/Estatistica';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { JogadorService } from '@app/Services/jogador.service';
import { PartidaService } from '@app/Services/partida.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estatisticas-visualizar',
  templateUrl: './estatisticas-visualizar.component.html',
  styleUrls: ['./estatisticas-visualizar.component.scss']
})
export class EstatisticasVisualizarComponent implements OnInit {
  @Input() modo!: string;
  partidaId = +this.activatedRouter.snapshot.paramMap.get('id');
  stats:Estatistica[];
  totalDano:number = 0
  totalDerrubados:number = 0
  totalCura:number = 0
  totalLevantados:number = 0
  totalRessucitou:number = 0
  currentView: string = 'visualizar';
  isLoading = false;
  idMvp:number = 0;
  
  constructor(    
    private estatisticaService: EstatisticaService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService,
    private jogadorService: JogadorService,
    private activatedRouter: ActivatedRoute,
    private partidaService: PartidaService) {
   }

  ngOnInit() {
    this.carregaDados();
    
  }
  public async carregaDados(): Promise<void> {
    this.partidaId = +this.activatedRouter.snapshot.paramMap.get('id');
  
    if (this.partidaId !== null && this.partidaId > 0) {
      this.spiner.show();
      try {
        // Aguarda a partida ser carregada
        this.stats = await this.estatisticaService.getEstatisticasByPartidaId(this.partidaId).toPromise();
        this.partidaService.updatedStats$.subscribe((updatedStats) => {
          if (updatedStats) {
            this.stats = updatedStats;
          }
        });
        await this.carregaTotais();
        await this.carregaPercents()
        this.idMvp =  this.calcularMVP(this.stats)
      } catch (error) {
        console.error(error);
        this.toaster.error('Erro ao carregar dados', 'Erro!');
      } finally {
        this.spiner.hide();
      }
    }
  }
  public carregaTotais():void{
    this.stats.forEach(e=> {
      this.totalDano += e.dano;
      this.totalDerrubados +=e.derrubado
      this.totalCura +=e.cura
      this.totalLevantados +=e.levantados
      this.totalRessucitou +=e.ressucitou
    });
  }
  public carregaPercents():void{
    this.stats.forEach(e=>{

      if (!e.porcentagem) {
        e.porcentagem = {};
      }
      e.porcentagem.percentDano = (e.dano *100)/this.totalDano;
      e.porcentagem.percentDerrubado = (e.derrubado *100)/this.totalDerrubados;
      e.porcentagem.percentCura = (e.cura *100)/this.totalCura;
      e.porcentagem.percentLevantados = (e.levantados *100)/this.totalLevantados;
      e.porcentagem.percentRessucitou = (e.ressucitou *100)/this.totalRessucitou; 
    })
  }
  public alterarEstatistica():void{
    if(this.currentView ==='editar'){
      this.partidaService.setViewMode('visualizar');
    }
    else{
      this.partidaService.setViewMode('editar');

    }
  }
  private calcularMVP(estatisticas: Estatistica[]): number | null {
    if (!estatisticas || estatisticas.length === 0) {
      return null; // Sem estatísticas, não há MVP
    }
  
    let maiorPontuacao = -Infinity;
    let MVP = null;
  
    estatisticas.forEach(estatistica => {
      const pontuacao = this.calcularPontuacao(estatistica);
  
      if (pontuacao > maiorPontuacao) {
        maiorPontuacao = pontuacao;
        MVP = estatistica.jogador.id; 
      }
    });
  
    return MVP;
  }
  private calcularPontuacao(estatistica: Estatistica): number {
    const tempoString = this.converteToTime(estatistica.tempo) || "0:00"; // Pega o valor ou um padrão "0:00"
    const minutos = this.extrairMinutos(tempoString); // Extrai os minutos como um número

    const kills = estatistica.kill || 0;
    const mortes = estatistica.morte || 0;
    const assistencias = estatistica.assistencia || 0;
    const dano = estatistica.dano || 0;
    const derrubados = estatistica.derrubado || 0;
    const cura = estatistica.cura || 0;
    const levantou = estatistica.levantados || 0;
    const ressuscitou = estatistica.ressucitou || 0;
  
    return (
      (kills * 4) +
      (mortes * -2) +
      (assistencias * 2) +
      (dano / 100) +
      (derrubados * 1) +
      (cura / 50) +
      (levantou * 3) +
      (ressuscitou * 5) +
      (minutos * 1)
    );
  }
  private extrairMinutos(tempo: string): number {
    const [minutos] = tempo.split(':').map(Number); // Divide a string e converte a primeira parte (minutos)
    return minutos || 0; // Retorna 0 se os minutos não forem válidos
  }
  converteToTime(seconds: string): string {
    const minutes = Math.floor(parseInt(seconds) / 60);
    const remainingSeconds = parseInt(seconds) % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

}
