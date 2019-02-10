import { Injectable, Inject } from '@angular/core';
import { AccountsService } from './eth.services';

// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';

// Web3
import { WEB3 } from '../services/tokens';
import Web3 from 'web3';

import * as fromAction from './eth.actions';

// RXJS
import { tap, switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class EthEffects {
  constructor(
    private actions$: Actions<fromAction.EthActionsUnion>,
    @Inject(WEB3) private web3: Web3,
    private accSrv: AccountsService
  ) {}

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




  @Effect()
    SelectDefaultAccount$ = this.actions$.pipe(
      ofType(fromAction.ActionTypes.SELECT_DEFAULT_ACCOUNT),
      tap((action: fromAction.SelectDefaultAccount) => this.accSrv.defaultAccount = action.payload),
      map(() => new fromAction.GetDefaultAccount())
        );


/*
  based on https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
and
  based on https://medium.com/b2expand/inject-web3-in-angular-6-0-a03ca345892
This code use the new way to connect to the MetaMask.
!!!The first time you use this token in your code you should call the enable method of window.ethereum :

  */

  /*
          based on https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
          Dapps must now request access to user accounts by calling a new method on the provider: ethereum.enable().
          This method returns a Promise that’s either resolved with user accounts after user approval,
          or rejected with an Error after user rejection.

          Important to remember that when we call ethereum.enable(), it will pop up the MetaMask windows in browser to confirm.

          From a UX point of view I think you should only enable it when you need it,
          else the user will face a popup message when the app start, which is never good UX.
          Let’s say you use 3box for a distributed profile for example.
          You would only call enable of window.ethereum when you try to login into you profile.
       */
  @Effect()
  InitEther$ = this.actions$.pipe(
    ofType(fromAction.ActionTypes.INIT_ETH),
    switchMap((action: fromAction.InitEth) => {
      if ('enable' in this.web3.currentProvider) {
        // !!! here we are using the from operator to convert Promise to Observable
        // see https://www.learnrxjs.io/operators/creation/from.html
        return from(this.web3.currentProvider.enable()).pipe(
          tap(ethAccounts =>
            console.log('User approve access to web3. User accounts are:', ethAccounts)
          ),
          map((ethAccounts: string[]) => new fromAction.InitEthSuccess()),
          // user reject access to web3 account
          catchError((err: any) => of(new fromAction.EthError(err)))
        );
      }
    })
  );
}
