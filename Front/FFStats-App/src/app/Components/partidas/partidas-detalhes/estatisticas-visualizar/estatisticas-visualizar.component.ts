import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estatistica } from '@app/Model/Estatistica';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { JogadorService } from '@app/Services/jogador.service';
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
  
  constructor(    
    private estatisticaService: EstatisticaService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService,
    private jogadorService: JogadorService,
    private activatedRouter: ActivatedRoute,) {
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
        await this.carregaTotais();
        await this.carregaPercents()
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

}
