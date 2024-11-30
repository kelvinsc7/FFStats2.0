//Area Angular
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, TemplateRef } from '@angular/core';

//Area NGX
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';


//Area APP
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Area Shared
import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/Titulo/Titulo.component';
import { FooterComponent } from './shared/footer/footer.component';

//Area Call Componet
import { CallComponent } from './Components/Call/Call.component';
import { CallDetalhesComponent } from './Components/Call/call-detalhes/call-detalhes.component';
import { CallListasComponent } from './Components/Call/call-listas/call-listas.component';
import { CallService } from './Services/call.service';

//Area Jogadores Components
import { JogadoresComponent } from './Components/Jogadores/Jogadores.component';
import { JogadoresListaComponent } from './Components/Jogadores/jogadores-lista/jogadores-lista.component';
import { JogadoresDetalhesComponent } from './Components/Jogadores/jogadores-detalhes/jogadores-detalhes.component';
import { JogadorService } from './Services/jogador.service';

//Area Dashboard Components
import { DashboardComponent } from './Components/dashboard/dashboard.component';

//Area Mapas Components
import { MapasComponent } from './Components/mapas/mapas.component';
import { MapaDetalhesComponent } from './Components/mapas/mapa-detalhes/mapa-detalhes.component';
import { MapaListaComponent } from './Components/mapas/mapa-lista/mapa-lista.component';
import { MapaService } from './Services/mapa.service';

//area modo Components
import { ModoComponent } from './Components/Modo/Modo.component';
import { ModoService } from './Services/modo.service';

//Area Partida Components
import { PartidasComponent } from './Components/partidas/partidas.component';
import { PartidasDetalhesComponent} from './Components/partidas/partidas-detalhes/partidas-detalhes.component'
import { PartidasListaComponent } from './Components/partidas/partidas-lista/partidas-lista.component';
import { PartidaService } from './Services/partida.service';

//Area BuscaApiComponente
import { BuscaApiComponent } from './Components/BuscaApi/busca-api.component';

//Area Perfil Components
import { PerfilComponent } from './Components/user/Perfil/Perfil.component';
import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegistrationComponent } from './Components/user/registration/registration.component';

//Area Treino Components
import { TreinoComponent } from './Components/Treino/Treino.component';
import { TreinoDetalhesComponent } from './Components/Treino/treino-detalhes/treino-detalhes.component';
import { TreinoListaComponent } from './Components/Treino/treino-lista/treino-lista.component';
import { TreinoService } from './Services/treino.service';

//Area Estatisticas Components
import { EstatisticaService } from './Services/estatistica.service';
import { LineService } from './Services/Line.service';

//Area Pipes
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { SubmodoService } from './Services/submodoService.service';
import { BuscaApiDetalhesComponent } from './Components/BuscaApi/BuscaApi-detalhes/BuscaApi-detalhes.component';
import { ConfiguracaoService } from './Services/configuracao.service';
import { ConfiguracaoComponent } from './Components/Configuracoes/configuracao/configuracao.component';
import { JogadoresEstatisticasComponent } from './Components/Jogadores/jogadores-estatisticas/jogadores-estatisticas.component';


defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TituloComponent,
    CallComponent,
    CallDetalhesComponent,
    CallListasComponent,
    DashboardComponent,
    JogadoresComponent,
    JogadoresListaComponent,
    JogadoresDetalhesComponent,
    MapasComponent,
    MapaDetalhesComponent,
    MapaListaComponent,
    ModoComponent,
    PartidasComponent,
    PartidasListaComponent,
    PartidasDetalhesComponent,
    PerfilComponent,
    TreinoComponent,
    TreinoDetalhesComponent,
    TreinoListaComponent,
    FooterComponent,
    DateTimeFormatPipe,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    BuscaApiComponent,
    BuscaApiDetalhesComponent,
    ConfiguracaoComponent,
    JogadoresEstatisticasComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
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
    EstatisticaService,
    SubmodoService,
    LineService,
    ConfiguracaoService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
