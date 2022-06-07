import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallComponent } from './Components/Call/Call.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { JogadoresComponent } from './Components/Jogadores/Jogadores.component';
import { MapasComponent } from './Components/mapas/mapas.component';
import { ModoComponent } from './Components/Modo/Modo.component';
import { PartidasComponent } from './Components/partidas/partidas.component';
import { PerfilComponent } from './Components/Perfil/Perfil.component';
import { TreinoComponent } from './Components/Treino/Treino.component';

const routes: Routes = [
  {path: 'call', component: CallComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'jogadores', component: JogadoresComponent},
  {path: 'mapas', component: MapasComponent},
  {path: 'modo', component: ModoComponent},
  {path: 'partidas', component: PartidasComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'treino', component: TreinoComponent},
  {path: '', redirectTo:'dashboard', pathMatch: 'full' },
  {path: '**', redirectTo:'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
