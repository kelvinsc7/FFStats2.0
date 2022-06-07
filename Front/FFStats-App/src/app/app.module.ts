import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { Component, TemplateRef } from '@angular/core';


import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/Titulo/Titulo.component';
import { CallComponent } from './Components/Call/Call.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { JogadoresComponent } from './Components/Jogadores/Jogadores.component';
import { MapasComponent } from './Components/mapas/mapas.component';
import { ModoComponent } from './Components/Modo/Modo.component';
import { PartidasComponent } from './Components/partidas/partidas.component';
import { PerfilComponent } from './Components/Perfil/Perfil.component';
import { TreinoComponent } from './Components/Treino/Treino.component';

import { PartidaService } from './Services/partida.service';
import { JogadorService } from './Services/jogador.service';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { TreinoService } from './Services/treino.service';
import { MapaService } from './Services/mapa.service';
import { CallService } from './Services/call.service';
import { ModoService } from './Services/modo.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TituloComponent,
    CallComponent,
    DashboardComponent,
    JogadoresComponent,
    MapasComponent,
    ModoComponent,
    PartidasComponent,
    PerfilComponent,
    TreinoComponent,
    DateTimeFormatPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
  ],
  providers: [
    PartidaService,
    JogadorService,
    TreinoService,
    MapaService,
    CallService,
    ModoService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
