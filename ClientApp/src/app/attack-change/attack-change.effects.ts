import { Injectable, Inject } from '@angular/core';
import { AttackChangeService } from './attack-change.services';

// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';

import * as fromAction from './attack-change.actions';

// RXJS
import { tap, switchMap, exhaustMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AttackChangeEffects {
  constructor(
    private actions$: Actions<fromAction.ChangeAttackActionsUnion>,
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
      exhaustMap((name: string) => this.ethSrv.setAttack(name).pipe(
            tap(response => console.log('response', response)),
            // map((responce: string) => new fromAction.SetAttackSuccess(name)),
            map(_ => new fromAction.SetAttackSuccess(name)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

        );



}
