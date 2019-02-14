import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, FlexLayoutModule } from '../shared';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './attack-change.reducers';
import { AttackChangeEffects } from './attack-change.effects';

// Services
import { AttackChangeService } from './attack-change.services';

import { AttackChangeComponent } from '../components/attack-change/attack-change.component';

@NgModule({
  declarations: [AttackChangeComponent],
  exports: [AttackChangeComponent],   // we use it from home.component which is defined in app.module
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule ,

    StoreModule.forFeature('attackState', reducers),
    EffectsModule.forFeature([AttackChangeEffects])
  ],
  providers: [AttackChangeService]
})
export class AttackChangeModule { }
