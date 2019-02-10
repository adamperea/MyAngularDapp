import { Injectable, Inject } from '@angular/core';
import { NameChangeService } from './name-change.services';

// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';

// Web3
import { WEB3 } from '../services/tokens';
import Web3 from 'web3';

import * as fromAction from './name-change.actions';

// RXJS
import { tap, switchMap, exhaustMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class NameChangeEffects {
  constructor(
    private actions$: Actions<fromAction.ChangeNameActionsUnion>,
    @Inject(WEB3) private web3: Web3,
    private ethSrv: NameChangeService
  ) {}


   @Effect()
    GetAccount$: Observable<Action> = this.actions$.pipe(
      ofType(fromAction.ActionTypes.GET_NAME),
      switchMap(() => this.ethSrv.getName().pipe(
            map((name: string) => new fromAction.GetNameSuccess(name)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

    );


    @Effect()
    SetName$: Observable<Action> = this.actions$.pipe(
      ofType(fromAction.ActionTypes.SET_NAME),
      map((action: fromAction.SetName) => action.payload),
      exhaustMap((payload: string) => this.ethSrv.setName(payload).pipe(
            map((name: string) => new fromAction.SetNameSuccess(name)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

        );



}
