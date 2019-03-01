import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, FlexLayoutModule } from '../shared';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './eth.reducers';
import { EthEffects } from './eth.effects';

import { EthService } from './eth.services';
import {EthRoutingModule} from './eth-routing.module';

import {EthPanelComponent} from './components/eth-panel/eth-panel.component';


@NgModule({
  declarations: [EthPanelComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    EthRoutingModule,

    StoreModule.forFeature('ethState', reducers),
    EffectsModule.forFeature([EthEffects])
  ],
  providers: [EthService]
})
export class EthModule { }
