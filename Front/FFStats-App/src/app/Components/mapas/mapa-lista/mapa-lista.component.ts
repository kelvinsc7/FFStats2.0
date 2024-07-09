import { Call } from '@app/Model/Call';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Estatistica } from '@app/Model/Estatistica';
import { Mapa } from '@app/Model/Mapa';
import { Partida } from '@app/Model/Partida';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { MapaService } from '@app/Services/mapa.service';
import { PartidaService } from '@app/Services/partida.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JogadorService } from '@app/Services/jogador.service';
import { Jogador } from '@app/Model/Jogador';

@Component({
  selector: 'app-mapa-lista',
  templateUrl: './mapa-lista.component.html',
  styleUrls: ['./mapa-lista.component.scss']
})
export class MapaListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public mapas: Mapa[] = [];
  public mapaFiltrada : Mapa[] = [];
  private _filtromapa: string = '';
  public mapaId:number = 0;
  public jogador: Jogador 

  

  public get filtromapa()
  {
    return this._filtromapa;
  }
  public set filtromapa(value: string)
  {
    this._filtromapa = value;
    this.mapaFiltrada = this.filtromapa ? this.filtrarmapa(this.filtromapa): this.mapas;
  }
  public filtrarmapa(filtrarPor: string):Mapa[]
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.mapas.filter(
      mapa => mapa.mapaNome.toLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private mapaService: MapaService,
    private jogadorService: JogadorService,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private partidaService : PartidaService,
    private estatisticaService : EstatisticaService,
    private router: Router,
    )
    { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getmapas();
    //this.QtdePartida();
  }


  public getmapas(): void{
    this.mapaService.getMapas().subscribe({
      next: (_mapa: Mapa[]) =>{
        this.mapas = _mapa


        // Loop sobre os jogadores
        for (const mapa of this.mapas) {
          this.partidaService.getPartidaByMapaId(mapa.id).subscribe({
            next: (partida: Partida[]) => {
              mapa.partida = partida;
            },
            error: (error: any) => {
              this.toastr.error("Erro ao carregar partidas do mapa", "Erro!");
            }
          });
        }
        this.mapaFiltrada = _mapa
      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar mapas","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public getCall(call : Call[]): string{
    return call.map(call=>call.callCidade).join(' - ');
  }
  public getQtdePartidas(par : Partida[]): number{

    return par.length;
  }
  public getQtdeBoyahh(par : Partida[]): number{
    return par.filter(p => p.posicao === 1).length
  }
  public getKills(par: Partida[]): number{
    return par.reduce((totalKills, partida) => {
      const killsInPartida = partida.estatisticas.reduce((acc, estatisticas) => acc + estatisticas.kill, 0);
      return totalKills + killsInPartida;
    }, 0);
  }


  public getMelhorJogador(partidas: Partida[]): string {
    let jogadorComMaisKills = '';
    let maxKills = 0;
    let jogadorKills: { [jogadorNick: string]: number } = {};
  
    partidas.forEach(partida => {
      if (partida.estatisticas) {
        partida.estatisticas.forEach((estatistica: Estatistica) => {
          if (estatistica.jogador && estatistica.jogador.jogadorNick) {
            const jogadorNick = estatistica.jogador.jogadorNick;
            if (!jogadorKills[jogadorNick]) {
              jogadorKills[jogadorNick] = 0;
            }
            jogadorKills[jogadorNick] += estatistica.kill;
          }
        });
      }
    });
  
    // Encontrar o jogador com mais kills
    for (const jogadorNick in jogadorKills) {
      if (jogadorKills[jogadorNick] > maxKills) {
        maxKills = jogadorKills[jogadorNick];
        jogadorComMaisKills = jogadorNick;
      }
    }
  
    return jogadorComMaisKills !=''? jogadorComMaisKills + '  \n(' + maxKills + ' Kills)':'';
  }


  public getCallMais(par : Partida[]): string{
    const contagemCidades: { [cidade: string]: number } = {};

    par.forEach(p => {
      const cidade = p.call.callCidade;
      if (cidade) {
        if (!contagemCidades[cidade]) {
          contagemCidades[cidade] = 0;
        }
        contagemCidades[cidade]++;
      }
    });

    let cidadeMaisComum = '';
    let maiorContagem = 0;

    for (const cidade in contagemCidades) {
      if (contagemCidades[cidade] > maiorContagem) {
        maiorContagem = contagemCidades[cidade];
        cidadeMaisComum = cidade;
      }
    }
    return cidadeMaisComum !='' ? cidadeMaisComum + ' '+ maiorContagem + 'x':'';
  }

  public openModal(event:any, template: TemplateRef<any>, id: number): void {
    event.stopPropagation();
    this.mapaId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.mapaService.deleteMapa(this.mapaId).subscribe(
      (result: any) =>{
        console.log(result);
        this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
        this.spinner.hide();
        this.getmapas();
      },
      (error: any) =>{
        //console.error(error);
        this.toastr.error('Erro ao tentar deletar o Evento', 'Erro:');
        this.spinner.hide();
      },
      () => this.spinner.hide(),
    );
  }

  public decline(): void {
    this.modalRef?.hide();
  }

  public detalheMapas(id:number):void{
    this.router.navigate([`mapas/detalhes/${id}`]);
  }
}
