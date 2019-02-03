import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './eth.reducers';
import { EthEffects } from './eth.effects';

// Services
import { AccountsService } from './eth.services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature('ethState', reducers),
    EffectsModule.forFeature([EthEffects])
  ],
  providers: [AccountsService]
})
export class EthModule { }
