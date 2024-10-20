import { Component, OnInit } from '@angular/core';
import { PlayerData } from '@app/Model/PlayerData';
import { JogadorService } from '@app/Services/jogador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PlayerStats } from '@app/Model/PlayerStats';

@Component({
  selector: 'app-BuscaApi-detalhes',
  templateUrl: './BuscaApi-detalhes.component.html',
  styleUrls: ['./BuscaApi-detalhes.component.scss']
})
export class BuscaApiDetalhesComponent implements OnInit {

  jogador={} as PlayerData;
  playerStats  = {} as PlayerStats

  constructor(
    private JogadorService : JogadorService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }
    public BuscarJogador(playerId: string):void{
    this.JogadorService.getJogadorByUId(parseInt(playerId)).subscribe(
      (jogador: PlayerData)=>{
        this.jogador = {...jogador};
        //this.form.patchValue(this.jogador);
      },
      ()=>{
        console.error(Error);
      },
    ).add(()=>this.spiner.hide());
    this.JogadorService.getJogadorByUId2(parseInt(playerId)).subscribe(
      (estatistica : PlayerStats)=>{
        this.playerStats  = {...estatistica};
        //this.form.patchValue(this.jogador);
      },
      ()=>{
        console.error(Error);
      },
    ).add(()=>this.spiner.hide());

  }
}
