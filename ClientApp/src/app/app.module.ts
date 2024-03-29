import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule, FlexLayoutModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

//NgRx
import { reducers, metaReducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment'; // Angular CLI environment


import { AppComponent } from './app.component';
import { HomePanelComponent } from './components/home-panel/home-panel.component';
import { PokemonComponent} from './components/pokemon/pokemon.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePanelComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),

    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      name: 'Ether Smart Contract State',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    // attaching to the route state to the app root state
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
