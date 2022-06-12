import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Treino } from '../../Model/Treino';
import { TreinoService } from '../../Services/treino.service';
import { Modo } from 'src/app/Model/Modo';
import { ModoService } from 'src/app/Services/modo.service';
import { Partida } from 'src/app/Model/Partida';
@Component({
  selector: 'app-Treino',
  templateUrl: './Treino.component.html',
  styleUrls: ['./Treino.component.scss'],
  // providers: [TreinoService]
})
export class TreinoComponent implements OnInit {

  ngOnInit(): void {

  }

}
