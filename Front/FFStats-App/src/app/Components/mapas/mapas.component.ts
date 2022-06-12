import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Mapa } from '../../Model/Mapa';
import { MapaService } from '../../Services/mapa.service';
import { Partida } from 'src/app/Model/Partida';
import { PartidaService } from 'src/app/Services/partida.service';
import { Estatistica } from 'src/app/Model/Estatistica';
import { EstatisticaService } from 'src/app/Services/estatistica.service';
@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css',
  //providers: [MapaService]
]
})
export class MapasComponent implements OnInit {

  ngOnInit(): void {

  }

}
