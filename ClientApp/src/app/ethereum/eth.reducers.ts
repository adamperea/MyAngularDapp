
import * as ethActions from './eth.actions';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as root from '../reducers';

// based on https://ngrx.io/guide/store/selectors
export interface State {
    ethConnectionStatus: boolean;
    selected: string;
    accounts: string[];
}

const initialState: State  = {
  ethConnectionStatus: false,
  selected: null,
  accounts: []
};


export const reducer = (state = initialState, action: ethActions.EthActionsUnion): State  => {
    switch (action.type) {

      case (ethActions.ActionTypes.INIT_ETH_SUCCESS): {
        return {...state, ethConnectionStatus: true};
      }
      case (ethActions.ActionTypes.GET_ACCOUNTS_SUCCESS): {
            return {...state, accounts: action.payload };
        }
        case (ethActions.ActionTypes.SELECT_ACCOUNT): {
            return {...state, selected: action.payload };
        }
        case (ethActions.ActionTypes.ETH_ERROR): {
            console.error('User denied account access. Error is:', action.payload);
            return state;
        }
        default: {
            return state;
        }
    }
};

// add new state slice
export interface EthState {
  eth: State ;
}

/**
 * Ethereum Global State
 */
export interface AppState extends root.AppState {
    ethState: EthState;
}

export const reducers: ActionReducerMap<EthState> = {
    eth: reducer
};


export const selectEthState = createFeatureSelector<AppState, EthState>('ethState');
export const getEthState = createSelector(selectEthState, (state: EthState) => state.eth);

export const getConStatus = createSelector(getEthState, (state: State) => state.ethConnectionStatus);
export const getAccounts = createSelector(getEthState, (state: State) => state.accounts);
export const getDefaultAccount = createSelector(getEthState, (state: State) => state.selected);

