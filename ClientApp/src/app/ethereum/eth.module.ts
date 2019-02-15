import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule, FlexLayoutModule } from '../shared';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './eth.reducers';
import { EthEffects } from './eth.effects';

// Services
import { AccountsService } from './eth.services';

import { EthAccountComponent } from './components/eth-account/eth-account.component';


const routes: Routes = [

  {
      path: '',
      component: EthAccountComponent,
  },

];


@NgModule({
  declarations: [EthAccountComponent],
  exports: [EthAccountComponent],   // we use it from home.component which is defined in app.module
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    RouterModule.forChild(routes),

    StoreModule.forFeature('ethState', reducers),
    EffectsModule.forFeature([EthEffects])
  ],
  providers: [AccountsService]
})
export class EthModule { }
