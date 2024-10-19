import { Component, OnInit } from '@angular/core';
import { JogadorService } from '@app/Services/jogador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-BuscaApi-detalhes',
  templateUrl: './BuscaApi-detalhes.component.html',
  styleUrls: ['./BuscaApi-detalhes.component.scss']
})
export class BuscaApiDetalhesComponent implements OnInit {

  constructor(
    private JogadorService : JogadorService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }
  public BuscarJogador():void{

  }
}
