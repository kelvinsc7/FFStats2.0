import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Call } from '@app/Model/Call';
import { CallService } from '@app/Services/call.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-call-listas',
  templateUrl: './call-listas.component.html',
  styleUrls: ['./call-listas.component.scss']
})
export class CallListasComponent implements OnInit {

  modalRef?: BsModalRef;
  public Calls: Call[] = [];
  public CallFiltrada : Call[] = [];
  private _filtroCall: string = '';
  public callId:number = 0;

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
    private spinner: NgxSpinnerService,
    private router : Router,
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
  public openModal(event:any, template: TemplateRef<any>, id: number): void {
    event.stopPropagation();
    this.callId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.CallService.deleteCall(this.callId).subscribe(
      (result: any) =>{
        console.log(result);
        this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
        this.spinner.hide();
        this.getCalls();
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
  detalheCall(id : number):void{
    this.router.navigate([`call/detalhes/${id}`]);
  }

}
