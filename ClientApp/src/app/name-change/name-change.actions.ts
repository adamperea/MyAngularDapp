import { Action } from '@ngrx/store';

export enum ActionTypes {
  SET_NAME = '[Change Name] Set Name',
  SET_NAME_SUCCESS = '[Change Name] Set Name Success',
  GET_NAME = '[Change Name] Get Name',
  GET_NAME_SUCCESS = '[Change Name] Get Name Success',
  ETH_ERROR = '[Change Name] Error',

}

/**
 * ACTIONS
 */
export class SetName implements Action {
  readonly type = ActionTypes.SET_NAME;
  constructor(public payload: string) {}
}


export class SetNameSuccess implements Action {
  readonly type = ActionTypes.SET_NAME_SUCCESS;
  constructor(public payload: string) {}
}

export class GetName implements Action {
  readonly type = ActionTypes.GET_NAME;
}


export class GetNameSuccess implements Action {
  readonly type = ActionTypes.GET_NAME_SUCCESS;
  constructor(public payload: string) {}
}


export class EthError implements Action {
    readonly type = ActionTypes.ETH_ERROR;
    constructor(public payload: any) {}
 }

export type ChangeNameActionsUnion =
    | SetName
    | SetNameSuccess
    | GetName
    | GetNameSuccess
    | EthError;
