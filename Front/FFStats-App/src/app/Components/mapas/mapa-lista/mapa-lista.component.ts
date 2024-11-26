import { Call } from './../../../Model/Call';
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
        for(const mapa of this.mapas){
          this.partidaService.getPartidaByMapaId(mapa.id).subscribe({
            next: (partida: Partida[]) =>{
              mapa.partidas = partida;
            },
            error: (error: any) => {
              this.toastr.error("Erro ao carregar estatísticas do jogador", "Erro!");
            }
          });
        }
        this.mapaFiltrada = this.mapas
        // this.carregaTotalPartida();
        // this.carregaTotalBooyah()
        // this.carregaKill();
      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar mapas","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  
  getQtdeKill(partidas: Partida[]): number {
    if (!partidas || partidas.length ===0)
      return 0;
    return partidas.reduce((totalKills, partida) => {
      const killsInPartida = partida.estatisticas.reduce((acc, estatisticas) => acc + estatisticas.kill, 0);
      return totalKills + killsInPartida;
    }, 0);
  }
  public getBooyah(mapa: Mapa): number {
    if (!mapa.partidas) return 0;
    return mapa.partidas.filter(p => p.posicao === 1).length;
  }
  public getTotalPartidas(mapa: Mapa): number {
    return mapa.partidas ? mapa.partidas.length : 0;
  }
  public getCalls(calls: Call[]):string{
    return calls.map(call => call.callCidade).join(' - ');
  }
  public getMelhorJogador(mapa: Mapa): string {
    if (!mapa.partidas || mapa.partidas.length === 0) return 'Sem dados';
  
    // Mapeia as estatísticas de kills por jogadorId
    const killsPorJogador: { [jogadorId: number]: number } = {};
  
    for (const partida of mapa.partidas) {
      if (partida.estatisticas) {
        for (const estatistica of partida.estatisticas) {
          const jogadorId = estatistica.jogador.id;  // Aqui garantimos que `jogador` é um objeto
          if (killsPorJogador[jogadorId]) {
            killsPorJogador[jogadorId] += estatistica.kill;
          } else {
            killsPorJogador[jogadorId] = estatistica.kill;
          }
        }
      }
    }
  
    // Encontra o jogadorId com o maior número de kills
    let jogadorComMaisKillsId: number | null = null;
    let maxKills = 0;
  
    for (const jogadorId in killsPorJogador) {
      if (killsPorJogador[jogadorId] > maxKills) {
        maxKills = killsPorJogador[jogadorId];
        jogadorComMaisKillsId = parseInt(jogadorId, 10);
      }
    }
  
    // Caso não tenha sido encontrado um jogador válido
    if (jogadorComMaisKillsId === null) return 'Sem dados';
  
    // Busca o nome do jogador com base no jogadorId
    const jogadorComMaisKills = mapa.partidas
      .flatMap(partida => partida.estatisticas)
      .find(estatistica => estatistica.jogador.id === jogadorComMaisKillsId)?.jogador.jogadorNick;
  
    return jogadorComMaisKills ? `${jogadorComMaisKills} (${maxKills} kills)` : 'Jogador não encontrado';
  }
  public getMaiorCall(mapa: Mapa): string {
    if (!mapa.partidas || mapa.partidas.length === 0) return 'Sem dados';

    // Mapeia as contagens de chamadas (CallId) por mapa e armazena o callCidade correspondente
    const callCount: { [callId: string]: { count: number, callCidade: string } } = {};

    // Itera sobre as partidas do mapa
    for (const partida of mapa.partidas) {
        const callId = partida.callId; // Supondo que cada partida possui um campo callId
        const callCidade = partida.call.callCidade; // Acessando o callCidade do objeto call

        if (callCount[callId]) {
            callCount[callId].count += 1; // Incrementa a contagem para este callId
        } else {
            callCount[callId] = { count: 1, callCidade }; // Inicializa a contagem e armazena o callCidade
        }
    }

    // Encontra o CallId com a maior quantidade de partidas
    let maiorCallCidade = '';
    let maxPartidas = 0;

    for (const callId in callCount) {
        if (callCount[callId].count > maxPartidas) {
            maxPartidas = callCount[callId].count;
            maiorCallCidade = callCount[callId].callCidade; // Obtém o callCidade correspondente
        }
    }

    return `${maiorCallCidade} (${maxPartidas} partidas)`;
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
