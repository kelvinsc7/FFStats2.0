import { Estatistica } from '@app/Model/Estatistica';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Partida } from '../../../Model/Partida';
import { PartidaService } from '../../../Services/partida.service';

@Component({
  selector: 'app-partidas-lista',
  templateUrl: './partidas-lista.component.html',
  styleUrls: ['./partidas-lista.component.scss']
})
export class PartidasListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public partidas: Partida[] = [];
  public partidaFiltrada : Partida[] = [];
  private _filtropartida: string = '';
  public partidaId:number = 0;

  public get filtropartida()
  {
    return this._filtropartida;
  }
  public set filtropartida(value: string)
  {
    this._filtropartida = value;
    this.partidaFiltrada = this.filtropartida ? this.filtrarPartida(this.filtropartida): this.partidas;
  }
  public filtrarPartida(filtrarPor: string):Partida[]
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.partidas.filter(
      partida => partida.partidaDescricao.toLowerCase().indexOf(filtrarPor) !== -1 ||
      partida.mapa.mapaNome.toLowerCase().indexOf(filtrarPor)!== -1 ||
      partida.call.callCidade.toLowerCase().indexOf(filtrarPor)!== -1
    )
  }

  constructor(
    private partidaService: PartidaService,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    )
    { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getPartidas();
  }

  public getPartidas(): void{
    this.partidaService.getPartidas().subscribe({
      next: (_partida: Partida[]) =>{
        this.partidas = _partida;
        this.partidaFiltrada = _partida;
        this.partidas.forEach(p=> {
          if (!p.estatisticas || p.estatisticas.length ===0)
            p.MVP = 'Sem Estatisticas';
          else
            p.MVP = this.calcularMVP(p.estatisticas); 
        })

      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Partidas","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public openModal(event:any, template: TemplateRef<any>, id: number): void {
    event.stopPropagation();
    this.partidaId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.partidaService.deletePartida(this.partidaId).subscribe(
      (result: any) =>{
        console.log(result);
        this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
        this.spinner.hide();
        this.getPartidas();
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

  public detalhePartida(id:number):void{
    this.router.navigate([`partidas/detalhes/${id}`]);
  }
  private calcularMVP(estatisticas: Estatistica[]): string | null {
    if (!estatisticas || estatisticas.length === 0) {
      return null; // Sem estatísticas, não há MVP
    }
  
    let maiorPontuacao = -Infinity;
    let nomeDoMVP = null;
  
    estatisticas.forEach(estatistica => {
      const pontuacao = this.calcularPontuacao(estatistica);
  
      if (pontuacao > maiorPontuacao) {
        maiorPontuacao = pontuacao;
        nomeDoMVP = estatistica.jogador.jogadorNick; // Assume que `jogadorNome` é a propriedade com o nome do jogador
      }
    });
  
    return nomeDoMVP;
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
