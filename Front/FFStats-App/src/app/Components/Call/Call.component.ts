import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Call } from '../../Model/Call';
import { CallService } from '../../Services/call.service';

@Component({
  selector: 'app-Call',
  templateUrl: './Call.component.html',
  styleUrls: ['./Call.component.scss']
   //providers: [CallService]
})
export class CallComponent implements OnInit {
  modalRef?: BsModalRef;
  public Calls: Call[] = [];
  public CallFiltrada : Call[] = [];
  private _filtroCall: string = '';

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
    private spinner: NgxSpinnerService
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
        this.CallFiltrada = _Call

      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar Calls","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Call excluida com sucesso!', 'Sucesso!');
  }

  public decline(): void {
    this.modalRef?.hide();
  }

}
