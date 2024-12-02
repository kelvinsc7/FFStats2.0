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
      } catch (error) {
        console.error(error);
        this.toaster.error('Erro ao carregar dados', 'Erro!');
      } finally {
        this.spiner.hide();
      }
    }
  }

}
