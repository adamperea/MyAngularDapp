import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EthInitGuard } from '../app/ethereum/guards/eth-init.guard';

import { ZeroComponent } from './components/zero/zero.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/zero', pathMatch: 'full',
  },
  {
    path: 'zero',
    component: ZeroComponent,
    //canActivate: [EthInitGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

