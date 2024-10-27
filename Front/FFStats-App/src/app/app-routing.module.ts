//Area Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Area Call
import { CallComponent } from './Components/Call/Call.component';
import { CallDetalhesComponent } from './Components/Call/call-detalhes/call-detalhes.component';
import { CallListasComponent } from './Components/Call/call-listas/call-listas.component';

//Area DashBoard
import { DashboardComponent } from './Components/dashboard/dashboard.component';

//Area Jogadores
import { JogadoresComponent } from './Components/Jogadores/Jogadores.component';
import { JogadoresDetalhesComponent } from './Components/Jogadores/jogadores-detalhes/jogadores-detalhes.component';
import { JogadoresListaComponent } from './Components/Jogadores/jogadores-lista/jogadores-lista.component';

//Area Mapas
import { MapasComponent } from './Components/mapas/mapas.component';
import { MapaDetalhesComponent } from './Components/mapas/mapa-detalhes/mapa-detalhes.component';
import { MapaListaComponent } from './Components/mapas/mapa-lista/mapa-lista.component';

//Area Modo
import { ModoComponent } from './Components/Modo/Modo.component';

import { BuscaApiComponent } from './Components/BuscaApi/busca-api.component';
import { BuscaApiDetalhesComponent } from './Components/BuscaApi/BuscaApi-detalhes/BuscaApi-detalhes.component';

//Area Partidas
import { PartidasComponent } from './Components/partidas/partidas.component';
import { PartidasDetalhesComponent} from './Components/partidas/partidas-detalhes/partidas-detalhes.component'
import { PartidasListaComponent } from './Components/partidas/partidas-lista/partidas-lista.component';

//Area Treino
import { TreinoComponent } from './Components/Treino/Treino.component';
import { TreinoDetalhesComponent } from './Components/Treino/treino-detalhes/treino-detalhes.component';
import { TreinoListaComponent } from './Components/Treino/treino-lista/treino-lista.component';

//Area User
import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegistrationComponent } from './Components/user/registration/registration.component';
import { PerfilComponent } from './Components/user/Perfil/Perfil.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children:[
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'perfil', component: PerfilComponent},
    ]
  },

  {path: 'call', redirectTo: 'call/lista'},
  {
    path: 'call', component: CallComponent,
    children:[
      {path: 'detalhes/:id', component: CallDetalhesComponent},
      {path: 'detalhes', component: CallDetalhesComponent},
      {path: 'lista', component: CallListasComponent}
    ]
  },

  {path: 'jogadores', redirectTo: 'jogadores/lista'},
  {
    path: 'jogadores', component: JogadoresComponent,
    children:[
      {path: 'detalhes/:id', component: JogadoresDetalhesComponent},
      {path: 'detalhes', component: JogadoresDetalhesComponent},
      {path: 'lista', component: JogadoresListaComponent},
    ]
  },

  {path: 'dashboard', component: DashboardComponent},

  {path: 'mapas', redirectTo: 'mapas/lista'},
  {
    path: 'mapas', component: MapasComponent,
    children:[
      {path: 'detalhes/:id', component: MapaDetalhesComponent},
      {path: 'detalhes', component: MapaDetalhesComponent},
      {path: 'lista', component: MapaListaComponent},
    ]
  },

  {path: 'modo', component: ModoComponent},

  {path: 'partidas', redirectTo: 'partidas/lista'},
  {
    path: 'partidas', component: PartidasComponent,
    children:[
      {path: 'detalhes/:id', component: PartidasDetalhesComponent},
      {path: 'detalhes', component: PartidasDetalhesComponent},
      {path: 'lista', component: PartidasListaComponent},
    ]
  },

  {path: 'treino', redirectTo: 'treino/lista'},
  {
    path: 'treino', component: TreinoComponent,
    children:[
      {path: 'detalhes/:id', component: TreinoDetalhesComponent},
      {path: 'detalhes', component: TreinoDetalhesComponent},
      {path: 'lista', component: TreinoListaComponent},
    ]
  },
  {path: 'BuscaApi', redirectTo: 'BuscaApi/detalhes'},
  {
    path: 'BuscaApi', component: BuscaApiComponent,
    children:[
      // {path: 'detalhes/:id', component: TreinoDetalhesComponent},
      {path: 'detalhes', component: BuscaApiDetalhesComponent}
      // {path: 'lista', component: TreinoListaComponent},
    ]
  },

  {path: '', redirectTo:'dashboard', pathMatch: 'full' },
  {path: '**', redirectTo:'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
