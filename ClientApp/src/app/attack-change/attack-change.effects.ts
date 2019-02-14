import { Injectable, Inject } from '@angular/core';
import { AttackChangeService } from './attack-change.services';

// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';

// Web3
import { WEB3 } from '../services/tokens';
import Web3 from 'web3';

import * as fromAction from './attack-change.actions';

// RXJS
import { tap, switchMap, exhaustMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AttackChangeEffects {
  constructor(
    private actions$: Actions<fromAction.ChangeAttackActionsUnion>,
    @Inject(WEB3) private web3: Web3,
    private ethSrv: AttackChangeService
  ) {}


   @Effect()
    GetAccount$: Observable<Action> = this.actions$.pipe(
      ofType(fromAction.ActionTypes.GET_ATTACK),
      switchMap(() => this.ethSrv.getAttack().pipe(
            map((name: string) => new fromAction.GetAttackSuccess(name)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

    );


    @Effect()
    SetAttack$: Observable<Action> = this.actions$.pipe(
      ofType(fromAction.ActionTypes.SET_ATTACK),
      map((action: fromAction.SetAttack) => action.payload),
      exhaustMap((payload: string) => this.ethSrv.setAttack(payload).pipe(
            map((name: string) => new fromAction.SetAttackSuccess(name)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

        );



}
