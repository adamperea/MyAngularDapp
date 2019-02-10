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
import { tap, switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class NameChangeEffects {
  constructor(
    private actions$: Actions<fromAction.ChangeNameActionsUnion>,
    @Inject(WEB3) private web3: Web3,
    private ethSrv: NameChangeService
  ) {}

  /*
   @Effect()
    GetAccounts$: Observable<Action> = this.actions$.pipe(
      ofType(fromAction.ActionTypes.GET_ACCOUNTS),
      switchMap(() => this.accSrv.getAccounts().pipe(
            map((accounts: string[]) => new fromAction.GetAccountsSuccess(accounts)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

        );


    @Effect()
    GetDefaultAccount$: Observable<Action> = this.actions$.pipe(
      ofType(fromAction.ActionTypes.GET_DEFAULT_ACCOUNT),
      switchMap(() => this.accSrv.currentAccount().pipe(
            map((account: string) => new fromAction.GetDefaultAccountSuccess(account)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

        );

*/

}
