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
  public JogadorId:number = 0;

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
    this.getJogadores();
    //this.getEstatisticas();
  }

  
  public getJogadores(): void {
    this.jogadorService.getJogadores().subscribe({
      next: (_jogadores: Jogador[]) => {
        this.jogadores = _jogadores;
        
  
        // Loop sobre os jogadores
        for (const jogador of this.jogadores) {
          this.estatisticaService.getEstatisticasByJogadorId(jogador.id).subscribe({
            next: (estatisticas: Estatistica[]) => {
              jogador.estatisticas = estatisticas;
            },
            error: (error: any) => {
              this.toastr.error("Erro ao carregar estatísticas do jogador", "Erro!");
            }
          });
        }
        this.jogadoresFiltrados = this.jogadores;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error("Erro ao carregar Jogadores", "Erro!");
      },
      complete: () => this.spinner.hide()
    });
  }
  // public getEstatisticas(): void{
  //   this.estatisticaService.getEstatisticasByJogadorId().subscribe({
  //     next: (_estatisticas: Estatistica[] ) => {
  //       this.estatistica = _estatisticas;
  //     },
  //     error: (error: any)=> {
  //       this.spinner.hide(),
  //       this.toastr.error("Erro ao carregar Estatisticaes","Erro!")
  //     },
  //     complete: () => this.spinner.hide()
  //   })
  // }
  public carregaKIll(est : Estatistica[]) :number {
    let totalKills = 0; est.forEach(item => { totalKills += item.kill; }); return totalKills; 
    
  }

  public getkd(est : Estatistica[]) :number {
    let totalKills = 0; 
    est.forEach(item => { totalKills += item.kill; }); 
    let totalmortes = 0
    est.forEach(item => { totalmortes += item.morte; }); 

    let kdRatio = totalKills/totalmortes;
    return  parseFloat(kdRatio.toFixed(2));
  }
  getQuantidadePartidasUnicas(est : Estatistica[]): number {
    const uniquePartidas  = new Set(est.map(e => e.partidaId));
    return uniquePartidas.size;;
  }
  public openModal(event:any, template: TemplateRef<any>, id: number): void {
    event.stopPropagation();
    this.JogadorId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.jogadorService.deleteJogador(this.JogadorId).subscribe(
      (result: any) =>{
        console.log(result);
        this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
        this.spinner.hide();
        this.getJogadores();
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

  detalheJogador(id : number):void
  {
    this.router.navigate([`jogadores/detalhes/${id}`]);
  }
  calculaKD(a: number, b: number):number
  {
    return b/a;
  }
}
