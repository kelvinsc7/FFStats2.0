import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Treino } from '../../../Model/Treino';
import { TreinoService } from '../../../Services/treino.service';
import { Modo } from 'src/app/Model/Modo';
import { ModoService } from 'src/app/Services/modo.service';
import { Partida } from 'src/app/Model/Partida';
import { Router } from '@angular/router';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { PartidaService } from '@app/Services/partida.service';
import { Estatistica } from '@app/Model/Estatistica';

@Component({
  selector: 'app-treino-lista',
  templateUrl: './treino-lista.component.html',
  styleUrls: ['./treino-lista.component.scss']
})
export class TreinoListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public treinos: Treino[] = [];
  public treinoFiltrada : Treino[] = [];
  private _filtrotreino: string = '';
  private modo :Modo  []=[];
  private _desc : Modo []= []
  public treinoId:number = 0

  public get desc()
  {
    return this._desc
  }

  public get filtrotreino()
  {
    return this._filtrotreino;
  }
  public set filtrotreino(value: string)
  {
    this._filtrotreino = value;
    this.treinoFiltrada = this.filtrotreino ? this.filtrartreino(this.filtrotreino): this.treinos;
  }
  public filtrartreino(filtrarPor: string):Treino[]
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.treinos.filter(
      treino => treino.treinoDescricao.toLowerCase().indexOf(filtrarPor) !== -1
    )
  }
  constructor(
    private treinoService: TreinoService,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modoService : ModoService,
    private partidaService: PartidaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getModos();
    this.getTreinos();
  }
  public getModos(): void{
    this.modoService.getModos().subscribe({
      next: (modo: Modo[]) =>{
        this.modo = modo
      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Treinos","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public getTreinos(): void{
    this.treinoService.getTreinos().subscribe({
      next: (_treino: Treino[]) =>{
        this.treinos = _treino
        

        for(const treino of this.treinos){
          this.partidaService.getPartidaByTreinoId(treino.id).subscribe({
            next: (partida: Partida[]) =>{
              treino.partidas = partida;
            },
            error: (error: any) => {
              this.toastr.error("Erro ao carregar estatísticas do jogador", "Erro!");
            }
          });
        }
        this.treinoFiltrada = this.treinos;
        this.atibuiModo()
      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Treinos","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public atibuiModo():void
  {
    for(let i =0;i<=this.treinoFiltrada.length;i++)
    {
      var j : number = this.treinoFiltrada[0].partidas[0].modoId
      this._desc = this.modo.filter(
        m => m.id == j)
    }
  }

  getQtdeKill(partidas: Partida[]): number {
    return partidas.reduce((totalKills, partida) => {
      const killsInPartida = partida.estatisticas.reduce((acc, estatisticas) => acc + estatisticas.kill, 0);
      return totalKills + killsInPartida;
    }, 0);
  }
  getQtdeDano(partidas: Partida[]): number {
    return partidas.reduce((totalKills, partida) => {
      const killsInPartida = partida.estatisticas.reduce((acc, estatisticas) => acc + estatisticas.dano, 0);
      return totalKills + killsInPartida;
    }, 0);
  }
  getPosicoes(partidas: Partida[]): string {
    return partidas.map(partida => partida.posicao).join(' - ');
  }
  getModo(partidas: Partida[]): string {
    const modosUnicos = new Set<string>(); // Usamos um Set para armazenar nomes únicos
    partidas.forEach(partida => {
      modosUnicos.add(partida.modo.modoDescricao); // Adiciona o nome do modo ao Set
    });
    return Array.from(modosUnicos).join(', '); // Converte Set para array e concatena em uma string
  }

  public openModal(event:any, template: TemplateRef<any>, id: number): void {
    event.stopPropagation();
    this.treinoId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.treinoService.deleteTreino(this.treinoId).subscribe(
      (result: any) =>{
        console.log(result);
        this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
        this.spinner.hide();
        this.getTreinos();
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
  public detalheTreino(id:number):void
  {
    this.router.navigate([`treino/detalhes/${id}`]);
  }

}
