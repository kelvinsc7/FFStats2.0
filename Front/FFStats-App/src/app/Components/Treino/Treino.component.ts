import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Treino } from '../../Model/Treino';
import { TreinoService } from '../../Services/treino.service';
import { Modo } from 'src/app/Model/Modo';
import { ModoService } from 'src/app/Services/modo.service';
import { Partida } from 'src/app/Model/Partida';
@Component({
  selector: 'app-Treino',
  templateUrl: './Treino.component.html',
  styleUrls: ['./Treino.component.scss'],
  // providers: [TreinoService]
})
export class TreinoComponent implements OnInit {
  modalRef?: BsModalRef;
  public treinos: Treino[] = [];
  public treinoFiltrada : Treino[] = [];
  private _filtrotreino: string = '';
  private modo :Modo  []=[];
  private _desc : Modo []= []

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
        this.treinoFiltrada = _treino
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

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Treino excluida com sucesso!', 'Sucesso!');
  }

  public decline(): void {
    this.modalRef?.hide();
  }

}
