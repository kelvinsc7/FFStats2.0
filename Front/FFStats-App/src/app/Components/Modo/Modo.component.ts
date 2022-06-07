import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Modo } from '../../Model/Modo';
import { ModoService } from '../../Services/modo.service';

@Component({
  selector: 'app-Modos',
  templateUrl: './Modo.component.html',
  styleUrls: ['./Modo.component.scss'],
  //providers: [ModoService]
})
export class ModoComponent implements OnInit {
  modalRef?: BsModalRef;
  public Modos: Modo[] = [];
  public ModoFiltrada : Modo[] = [];
  private _filtroModo: string = '';

  public get filtroModo()
  {
    return this._filtroModo;
  }
  public set filtroModo(value: string)
  {
    this._filtroModo = value;
    this.ModoFiltrada = this.filtroModo ? this.filtrarModo(this.filtroModo): this.Modos;
  }
  public filtrarModo(filtrarPor: string):Modo[]
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.Modos.filter(
      Modo => Modo.modoDescricao.toLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private ModoService: ModoService,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    )
    { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getModos();
  }

  public getModos(): void{
    this.ModoService.getModos().subscribe({
      next: (_Modo: Modo[]) =>{
        this.Modos = _Modo
        this.ModoFiltrada = _Modo

      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Modos","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Modo excluida com sucesso!', 'Sucesso!');
  }

  public decline(): void {
    this.modalRef?.hide();
  }

}
