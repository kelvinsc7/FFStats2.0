import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallComponent } from './Components/Call/Call.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { JogadoresDetalhesComponent } from './Components/Jogadores/jogadores-detalhes/jogadores-detalhes.component';
import { JogadoresListaComponent } from './Components/Jogadores/jogadores-lista/jogadores-lista.component';
import { JogadoresComponent } from './Components/Jogadores/Jogadores.component';

import { MapasComponent } from './Components/mapas/mapas.component';
import { ModoComponent } from './Components/Modo/Modo.component';
import { PartidasComponent } from './Components/partidas/partidas.component';
import { TreinoComponent } from './Components/Treino/Treino.component';

import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegistrationComponent } from './Components/user/registration/registration.component';
import { PerfilComponent } from './Components/user/Perfil/Perfil.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children:[
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
    ]
  },
  {path: 'user/perfil', component: PerfilComponent},
  {path: 'jogadores', redirectTo: 'jogadores/lista'},
  {
    path: 'jogadores', component: JogadoresComponent,
    children:[
      {path: 'detalhes/:id', component: JogadoresDetalhesComponent},
      {path: 'detalhes', component: JogadoresDetalhesComponent},
      {path: 'lista', component: JogadoresListaComponent},
    ]
  },
  {path: 'call', component: CallComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'mapas', component: MapasComponent},
  {path: 'modo', component: ModoComponent},
  {path: 'partidas', component: PartidasComponent},
  {path: 'treino', component: TreinoComponent},
  {path: '', redirectTo:'dashboard', pathMatch: 'full' },
  {path: '**', redirectTo:'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
