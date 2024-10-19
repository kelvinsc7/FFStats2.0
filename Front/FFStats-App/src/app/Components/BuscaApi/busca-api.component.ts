import { Component, OnInit } from '@angular/core';
import { JogadorService } from '@app/Services/jogador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-busca-api',
  templateUrl: './busca-api.component.html',
  styleUrls: ['./busca-api.component.scss']
})
export class BuscaApiComponent implements OnInit {

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
