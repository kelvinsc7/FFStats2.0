import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Treino } from '../../Model/Treino';
import { TreinoService } from '../../Services/treino.service';
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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getTreinos();
  }
  public getTreinos(): void{
    this.treinoService.getTreinos().subscribe({
      next: (_treino: Treino[]) =>{
        this.treinos = _treino
        this.treinoFiltrada = _treino

      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Treinos","Erro!")
      },
      complete: () => this.spinner.hide()
    })
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
