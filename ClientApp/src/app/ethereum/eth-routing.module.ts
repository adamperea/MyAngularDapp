import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EthPanelComponent } from './components/eth-panel/eth-panel.component';


const routes: Routes = [
  {
      path: '',
      component: EthPanelComponent,
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EthRoutingModule { }

