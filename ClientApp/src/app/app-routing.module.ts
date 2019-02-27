import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as guards from '../app/ethereum/guards';

import { ZeroComponent } from './components/zero/zero.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/zero', pathMatch: 'full',
  },
  {
    path: 'zero',
    component: ZeroComponent,
  },
  {
    path: 'accounts',
    loadChildren: './ethereum/eth.module#EthModule',
    canActivate: [guards.EthInitGuard],
},
{
  path: 'attacks',
  loadChildren: './attack-change/attack-change.module#AttackChangeModule',
  canActivate: [guards.EthInitGuard],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

