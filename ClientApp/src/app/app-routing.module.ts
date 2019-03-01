import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as guards from '../app/ethereum/guards';

import { PokemonComponent } from './components/pokemon/pokemon.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/pokey-home', pathMatch: 'full',
  },
  {
    path: 'pokey-home',
    component: PokemonComponent,
  },
  {
    path: 'eth-portal',
    loadChildren: './ethereum/eth.module#EthModule',
    canActivate: [guards.EthInitGuard],
  },
  {
    path: 'pokey-attacks',
    loadChildren: './attack-change/attack-change.module#AttackChangeModule',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

