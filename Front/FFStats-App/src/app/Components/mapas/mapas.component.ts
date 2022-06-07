import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Mapa } from '../../Model/Mapa';
import { MapaService } from '../../Services/mapa.service';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css',
  //providers: [MapaService]
]
})
export class MapasComponent implements OnInit {
  modalRef?: BsModalRef;
  public mapas: Mapa[] = [];
  public mapaFiltrada : Mapa[] = [];
  private _filtromapa: string = '';

  public get filtromapa()
  {
    return this._filtromapa;
  }
  public set filtromapa(value: string)
  {
    this._filtromapa = value;
    this.mapaFiltrada = this.filtromapa ? this.filtrarmapa(this.filtromapa): this.mapas;
  }
  public filtrarmapa(filtrarPor: string):Mapa[]
  {
    filtrarPor = filtrarPor.toLowerCase();
    return this.mapas.filter(
      mapa => mapa.mapaNome.toLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private mapaService: MapaService,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    )
    { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getmapas();
  }

  public getmapas(): void{
    this.mapaService.getMapas().subscribe({
      next: (_mapa: Mapa[]) =>{
        this.mapas = _mapa
        this.mapaFiltrada = _mapa

      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar mapas","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Mapa excluida com sucesso!', 'Sucesso!');
  }

  public decline(): void {
    this.modalRef?.hide();
  }

}
