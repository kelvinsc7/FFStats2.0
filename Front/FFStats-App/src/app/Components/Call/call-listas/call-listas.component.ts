import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Call } from '@app/Model/Call';
import { Partida } from '@app/Model/Partida';
import { CallService } from '@app/Services/call.service';
import { PartidaService } from '@app/Services/partida.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-call-listas',
  templateUrl: './call-listas.component.html',
  styleUrls: ['./call-listas.component.scss']
})
export class CallListasComponent implements OnInit {

  modalRef?: BsModalRef;
  public Calls: Call[] = [];
  public CallFiltrada : Call[] = [];
  private _filtroCall: string = '';
  public callId:number = 0;

  public get filtroCall()
  {
    return this._filtroCall;
  }
  public set filtroCall(value: string)
  {
    this._filtroCall = value;
    this.CallFiltrada = this.filtroCall ? this.filtrarCall(this.filtroCall): this.Calls;
  }
  public filtrarCall(filtrarPor: string):Call[]
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.Calls.filter(
      Call => Call.callCidade.toLowerCase().indexOf(filtrarPor) !== -1 ||
      Call.mapa.mapaNome.toLowerCase().indexOf(filtrarPor)!== -1
    )
  }

  constructor(
    private CallService: CallService,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router : Router,
    private partidaService : PartidaService
    )
    { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getCalls();
  }

  public getCalls(): void{
    this.CallService.getCalls().subscribe({
      next: (_Call: Call[]) =>{
        this.Calls = _Call
        for(const call of this.Calls){
          this.partidaService.getPartidaByCallId(call.id).subscribe({
            next: (partida: Partida[]) =>{
              call.partidas = partida;
            },
            error: (error: any) => {
              this.toastr.error("Erro ao carregar Partidas da call", "Erro!");
            }
          });
        }
        this.CallFiltrada = _Call

      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Calls","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public openModal(event:any, template: TemplateRef<any>, id: number): void {
    event.stopPropagation();
    this.callId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  public getTotalPartidas(call: Call): number {
    return call.partidas ? call.partidas.length : 0;
  }
  public getBooyah(call: Call): number {
    if (!call.partidas) return 0;
    return call.partidas.filter(p => p.posicao === 1).length;
  }
  getQtdeKill(partidas: Partida[]): number {
    if (!partidas || partidas.length ===0)
      return 0
    return partidas.reduce((totalKills, partida) => {
      const killsInPartida = partida.estatisticas.reduce((acc, estatisticas) => acc + estatisticas.kill, 0);
      return totalKills + killsInPartida;
    }, 0);
  }
  public getMelhorJogador(call: Call): string {
    if (!call.partidas || call.partidas.length === 0) return 'Sem dados';
  
    // Mapeia as estatísticas de kills por jogadorId
    const killsPorJogador: { [jogadorId: number]: number } = {};
  
    for (const partida of call.partidas) {
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
    const jogadorComMaisKills = call.partidas
      .flatMap(partida => partida.estatisticas)
      .find(estatistica => estatistica.jogador.id === jogadorComMaisKillsId)?.jogador.jogadorNick;
  
    return jogadorComMaisKills ? `${jogadorComMaisKills} (${maxKills} kills)` : 'Jogador não encontrado';
  }
  public getUltima(partidas: Partida[]):string{

    if (!partidas || partidas.length === 0) {
      return 'Sem Dados'
    }
    const ultimaPartida = partidas.sort((a, b) => 
      new Date(b.partidaData).getTime() - new Date(a.partidaData).getTime()
    )[0];

    if (ultimaPartida?.partidaData) {
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return formatter.format(new Date(ultimaPartida.partidaData));
    }
  
    return null;
  }
  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.CallService.deleteCall(this.callId).subscribe(
      (result: any) =>{
        console.log(result);
        this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
        this.spinner.hide();
        this.getCalls();
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
  detalheCall(id : number):void{
    this.router.navigate([`call/detalhes/${id}`]);
  }

}
