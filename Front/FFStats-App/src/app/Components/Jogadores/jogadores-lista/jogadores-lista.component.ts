import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Estatistica } from 'src/app/Model/Estatistica';
import { Jogador } from 'src/app/Model/Jogador';
import { EstatisticaService } from 'src/app/Services/estatistica.service';
import { JogadorService } from 'src/app/Services/jogador.service';

@Component({
  selector: 'app-jogadores-lista',
  templateUrl: './jogadores-lista.component.html',
  styleUrls: ['./jogadores-lista.component.scss']
})
export class JogadoresListaComponent implements OnInit {
  modalRef?: BsModalRef;
  public jogadores: Jogador[]=[];
  public jogadoresFiltrados: Jogador[] = [];
  private _filtroLista: string = '';
  public estatistica: Estatistica[] = [];
  public totalKill : number[]=[];

  public get filtroLista()
  {
    return this._filtroLista;
  }
  public set filtroLista(value: string)
  {
    this._filtroLista = value;
    this.jogadoresFiltrados = this.filtroLista ? this.filtrarJogador(this.filtroLista): this.jogadores;
  }
  public filtrarJogador(filtrarPor: string):Jogador[]
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.jogadores.filter(
      (jogador: { jogadorNome: string; jogadorNick: string }) => jogador.jogadorNome.toLowerCase().indexOf(filtrarPor) !== -1 ||
      jogador.jogadorNick.toLowerCase().indexOf(filtrarPor) !== -1

    )
  }

  constructor(
    private jogadorService: JogadorService,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private estatisticaService: EstatisticaService,
    private router : Router,
    )
    { }

  public ngOnInit() {
    this.spinner.show();
    this.getEstatisticas();
    this.getJogadores();
  }
  public getJogadores(): void{
    this.jogadorService.getJogadores().subscribe({
      next: (_jogadores: Jogador[] ) => {
        this.jogadores = _jogadores
        this.jogadoresFiltrados = this.jogadores
        this.carregaKIll()
      },
      error: (error: any)=> {
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Jogadores","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public getEstatisticas(): void{
    this.estatisticaService.getEstatisticas().subscribe({
      next: (_estatisticas: Estatistica[] ) => {
        this.estatistica = _estatisticas;
      },
      error: (error: any)=> {
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Estatisticaes","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public carregaKIll() :void {
    for(let i=0;i<=this.estatistica.length;i++)
    {
      this.totalKill[i] = this.estatistica.filter(
      e => e.jogadorId == i).reduce((a,b) => a + b.kill,0);
    }
  }
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Jogador excluido com sucesso!', 'Sucesso!');
  }

  public decline(): void {
    this.modalRef?.hide();
  }

  detalheJogador(id : number):void
  {
    this.router.navigate([`jogadores/detalhes/${id}`]);
  }
  calculaKD(a: number, b: number):number
  {
    return b/a;
  }
}
