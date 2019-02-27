
import { Injectable, Inject } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import {exhaustMap, switchMap, map, tap, catchError } from 'rxjs/operators';

import { WEB3, SmartContract } from '../services/tokens';
import Web3 from 'web3';
import {TruffleContract} from 'truffle-contract';

import { AccountsService } from './eth.services';
import * as fromAction from './eth.actions';



@Injectable()
export class EthEffects {
  constructor(
    private actions$: Actions<fromAction.EthActionsUnion>,
    @Inject(WEB3) private web3: Web3,
    @Inject(SmartContract) private smartContract: TruffleContract,
    private accSrv: AccountsService
  ) {}


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
        exhaustMap((action: fromAction.InitEth) => {

          if ('enable' in this.web3.currentProvider) {

            /*
            based on https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
            This method returns a Promise that’s either resolved with user accounts after user approval,
             or rejected with an Error after user rejection.
            */
            // !!! here we are using the from operator to convert Promise to Observable
            // see https://www.learnrxjs.io/operators/creation/from.html
            // basically at this place MetaMask will popup the message asking permission to access
            // the user accounts.
            return from(this.web3.currentProvider.enable()).pipe(
              tap((ethAccounts: string[]) =>
                console.log('User granted access Ethereum provider to user accounts', ethAccounts)
              ),

              switchMap((ethAccounts: string[]) => {

                if (ethAccounts.length === 0) {
                  return [new fromAction.EthError(new Error('Can not get any user accounts'))];

                }

                // set default account
                this.accSrv.defaultAccount = ethAccounts[0];

                // set the provider for the smart contract
                this.smartContract.setProvider(this.web3.currentProvider);

                // dispatch multiple actions at ones
                return  [
                    new fromAction.InitEthSuccess(),
                    new fromAction.GetAccountsSuccess(ethAccounts),
                    new fromAction.SetDefaultAccountSuccess(ethAccounts[0])
                  ];

              }),

              // user reject access to web3 account
              catchError((err: any) => of(new fromAction.EthError(err)))
            );
          }
        })
      );




  @Effect()
    GetAccounts$: Observable<Action> = this.actions$.pipe(
      ofType(fromAction.ActionTypes.GET_ACCOUNTS),
      switchMap(() => this.accSrv.getAccounts().pipe(
            map((accounts: string[]) => new fromAction.GetAccountsSuccess(accounts)),
            catchError(err => of(new fromAction.EthError(err)))
          )),

        );


  @Effect()
    SetDefaultAccount$ = this.actions$.pipe(
      ofType(fromAction.ActionTypes.SET_DEFAULT_ACCOUNT),
      map((action: fromAction.SetDefaultAccount) => {

         this.accSrv.defaultAccount = action.payload;

         return new fromAction.SetDefaultAccountSuccess(action.payload);
      })
   );



  @Effect()
  GetAccountBalance$: Observable<Action> = this.actions$.pipe(
    ofType(fromAction.ActionTypes.GET_CURRENT_BALANCE),
    switchMap(() => this.accSrv.getAccountBalance().pipe(
          map((balance: string) => new fromAction.GetAccountBalanceSuccess(balance)),
          catchError(err => of(new fromAction.EthError(err)))
        )),

      );





}
