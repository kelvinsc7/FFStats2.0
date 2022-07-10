import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Estatistica } from '@app/Model/Estatistica';
import { Mapa } from '@app/Model/Mapa';
import { Partida } from '@app/Model/Partida';
import { EstatisticaService } from '@app/Services/estatistica.service';
import { MapaService } from '@app/Services/mapa.service';
import { PartidaService } from '@app/Services/partida.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mapa-lista',
  templateUrl: './mapa-lista.component.html',
  styleUrls: ['./mapa-lista.component.scss']
})
export class MapaListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public mapas: Mapa[] = [];
  public mapaFiltrada : Mapa[] = [];
  private _filtromapa: string = '';
  private partida : Partida[]=[];
  private _qtdePardida : Number[]=[];
  private _booyahh : Number[]=[];
  private estatistica : Estatistica[]=[];
  private _kill : Number[]=[];
  private partidaEstatistica : Partida[]=[];
  public mapaId:number = 0;

  public get kill()
  {
    return this._kill;
  }
  public get booyahh()
  {
    return this._booyahh;
  }

  public get qtdePardida()
  {
    return this._qtdePardida;
  }

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
    private spinner: NgxSpinnerService,
    private partidaService : PartidaService,
    private estatisticaService : EstatisticaService,
    private router: Router,
    )
    { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getAllPartidas();
    this.getmapas();
    //this.QtdePartida();
  }

  public getAllPartidas() : void{
    this.partidaService.getPartidas().subscribe({
      next: (_partida: Partida[]) =>{
        this.partida = _partida
      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar mapas","Erro!")
      },
      complete: () => this.spinner.hide()
    })

  }
  // public getAllEstatisticas() : void{
  //   this.estatisticaService.getEstatisticas().subscribe({
  //     next: (_estatisticas: Estatistica[]) =>{
  //       this.estatistica = _estatisticas
  //     },
  //     error: (error: any)=>{
  //       this.spinner.hide(),
  //       this.toastr.error("Erro ao carregar estatisticas","Erro!")
  //     },
  //     complete: () => this.spinner.hide()
  //   })

  // }
  public getmapas(): void{
    this.mapaService.getMapas().subscribe({
      next: (_mapa: Mapa[]) =>{
        this.mapas = _mapa
        this.mapaFiltrada = _mapa
        this.carregaTotalPartida();
        this.carregaTotalBooyah()
        this.carregaKill();
      },
      error: (error: any)=>{
        this.spinner.hide(),
        this.toastr.error("Erro ao carregar mapas","Erro!")
      },
      complete: () => this.spinner.hide()
    })
  }
  public carregaTotalPartida():void{
    for(let i=0;i<=this.mapas.length;i++)
    {
      this.qtdePardida[i] = this.partida.filter(
      p => p.mapaId == i).length;
    }
  }
  public carregaTotalBooyah():void{
    for(let i=0;i<=this.mapas.length;i++)
    {
      this.booyahh[i] = this.partida.filter(
      p => p.mapaId == i && p.posicao ==1).length;
    }
  }
  public carregaKill():void{
    var total :number = 0;
    for(let i=1;i<=this.mapas.length;i++)
    {
      this.partidaEstatistica = this.partida.filter(p => p.mapaId == i)
      console.log("Tamanho da controladora: "+this.partidaEstatistica.length)
      for(let j=0;j<this.partidaEstatistica.length;j++)
      {
        console.log("Controladora: " + this.partidaEstatistica[j].id)
        total = total+this.estatistica.filter(e => e.partidaId == this.partidaEstatistica[j].id).length
        console.log(this.estatistica.filter(e => e.partidaId == this.partidaEstatistica[j].id))
        console.log("Quantidade de estatistica: " + total);
      }
      this._kill[i] = total
      total = 0;
      console.log(this._kill[i])
    }
  }

  public openModal(event:any, template: TemplateRef<any>, id: number): void {
    event.stopPropagation();
    this.mapaId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.mapaService.deleteMapa(this.mapaId).subscribe(
      (result: any) =>{
        console.log(result);
        this.toastr.success('Partida excluida com sucesso!', 'Sucesso!');
        this.spinner.hide();
        this.getmapas();
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

  public detalheMapas(id:number):void{
    this.router.navigate([`mapas/detalhes/${id}`]);
  }
}
