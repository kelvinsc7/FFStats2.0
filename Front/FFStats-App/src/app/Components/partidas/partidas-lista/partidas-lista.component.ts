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
        this.partidas = _partida
        this.partidaFiltrada = _partida

      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Partidas","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
  }

  public decline(): void {
    this.modalRef?.hide();
  }

  public detalhePartida(id:number):void{
    this.router.navigate([`partidas/detalhes/${id}`]);
  }
}
