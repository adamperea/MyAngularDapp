import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, FlexLayoutModule } from '../shared';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './name-change.reducers';
import { NameChangeEffects } from './name-change.effects';

// Services
import { NameChangeService } from './name-change.services';

import { NameChangeComponent } from '../components/name-change/name-change.component';

@NgModule({
  declarations: [NameChangeComponent],
  exports: [NameChangeComponent],   // we use it from home.component which is defined in app.module
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule ,

    StoreModule.forFeature('ngState', reducers),
    EffectsModule.forFeature([NameChangeEffects])
  ],
  providers: [NameChangeService]
})
export class NameChangeModule { }
