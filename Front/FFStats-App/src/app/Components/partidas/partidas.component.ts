import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Partida } from '../../Model/Partida';
import { PartidaService } from '../../Services/partida.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss'],
  //providers: [PartidaService]
})
export class PartidasComponent implements OnInit {

  ngOnInit() {
  }

}
