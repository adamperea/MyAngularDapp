import { Action } from '@ngrx/store';

export enum ActionTypes {
  /**
 * TYPES
 */
/*
based on https://medium.com/b2expand/inject-web3-in-angular-6-0-a03ca345892
The new way to connect to the MetaMask.
 The first time you use this token in your code you should call the enable method of window.ethereum (see effect implementation)
*/
  INIT_ETH = '[Eth] Init Ethereum',
  INIT_ETH_SUCCESS = '[Eth] Init Ethereum Success',
  GET_ACCOUNTS = '[Eth] Get Accounts',
  GET_ACCOUNTS_SUCCESS = '[Eth] Get Accounts Success',
  SELECT_ACCOUNT = '[Eth] Select Account',
  ETH_ERROR = '[Eth] Error',

}

/**
 * ACTIONS
 */
export class InitEth implements Action {
  readonly type = ActionTypes.INIT_ETH;
}


export class InitEthSuccess implements Action {
  readonly type = ActionTypes.INIT_ETH_SUCCESS;
}


export class GetAccounts implements Action {
    readonly type = ActionTypes.GET_ACCOUNTS;
}

export class GetAccountsSuccess implements Action {
    readonly type = ActionTypes.GET_ACCOUNTS_SUCCESS;
    constructor(public payload: string[]) {}
}

export class SelectAccount implements Action {
    readonly type = ActionTypes.SELECT_ACCOUNT;
    constructor(public payload: string) {}
}

export class EthError implements Action {
    readonly type = ActionTypes.ETH_ERROR;
    constructor(public payload: any) {}
 }

export type EthActionsUnion =
    | InitEth
    | InitEthSuccess
    | GetAccounts
    | GetAccountsSuccess
    | SelectAccount
    | EthError;
