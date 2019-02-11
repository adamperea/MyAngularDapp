import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, FlexLayoutModule } from '../shared';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './eth.reducers';
import { EthEffects } from './eth.effects';

// Services
import { AccountsService } from './eth.services';

import { EthAccountComponent } from '../components/eth-account/eth-account.component';

@NgModule({
  declarations: [EthAccountComponent],
  exports: [EthAccountComponent],   // we use it from home.component which is defined in app.module
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    StoreModule.forFeature('ethState', reducers),
    EffectsModule.forFeature([EthEffects])
  ],
  providers: [AccountsService]
})
export class EthModule { }
