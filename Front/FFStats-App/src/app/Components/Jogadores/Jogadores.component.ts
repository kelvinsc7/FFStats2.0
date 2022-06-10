import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from '../../Model/Jogador';
import { JogadorService } from '../../Services/jogador.service';
import { Estatistica } from 'src/app/Model/Estatistica';
import { EstatisticaService } from 'src/app/Services/estatistica.service';


@Component({
  selector: 'app-Jogadores',
  templateUrl: './Jogadores.component.html',
  styleUrls: ['./Jogadores.component.scss'],
  //providers:[JogadorService]
})
export class JogadoresComponent implements OnInit {
  ngOnInit(): void {

  }

}
