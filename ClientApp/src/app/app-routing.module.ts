import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EthInitGuard } from '../app/ethereum/guards/eth-init.guard';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [EthInitGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

