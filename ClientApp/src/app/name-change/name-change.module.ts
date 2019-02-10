import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './name-change.reducers';
import { NameChangeEffects } from './name-change.effects';

// Services
import { NameChangeService } from './name-change.services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature('ngState', reducers),
    EffectsModule.forFeature([NameChangeEffects])
  ],
  providers: [NameChangeService]
})
export class NameChangeModule { }
