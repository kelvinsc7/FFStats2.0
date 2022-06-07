import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '../../Model/Jogador';
import { JogadorService } from '../../Services/jogador.service';

@Component({
  selector: 'app-Jogadores',
  templateUrl: './Jogadores.component.html',
  styleUrls: ['./Jogadores.component.scss'],
  //providers:[JogadorService]
})
export class JogadoresComponent implements OnInit {
  modalRef?: BsModalRef;
  public jogadores: Jogador[]=[];
  public jogadoresFiltrados: Jogador[] = [];
  private _filtroLista: string = '';

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
    private spinner: NgxSpinnerService
    )
    { }

  public ngOnInit() {
    this.spinner.show();
    this.getJogadores();
  }
  public getJogadores(): void{
    this.jogadorService.getJogadores().subscribe({
      next: (_jogadores: Jogador[] ) => {
        this.jogadores = _jogadores
        this.jogadoresFiltrados = this.jogadores
      },
      error: (error: any)=> {
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Jogadores","Erro!")
      },
      complete: () => this.spinner.hide()
    })
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

}
