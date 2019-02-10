
import * as nameChangeActions from './name-change.actions';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as root from '../reducers';

// based on https://ngrx.io/guide/store/selectors
export interface State {
    name: string;
}

const initialState: State  = {
  name: null,
};


export const reducer = (state = initialState, action: nameChangeActions.ChangeNameActionsUnion): State  => {
    switch (action.type) {

      case (nameChangeActions.ActionTypes.GET_NAME_SUCCESS): {
        return {...state, name: action.payload};
      }

      case (nameChangeActions.ActionTypes.SET_NAME_SUCCESS): {
            return {...state, name: action.payload };
      }
      case (nameChangeActions.ActionTypes.ETH_ERROR): {
            console.error('Got error:', action.payload);
            return state;
      }
      default: {
            return state;
      }
    }
};

// add new state slice
export interface NameChangeState {
  ng: State ;
}

/**
 * Ethereum Global State
 */
export interface AppState extends root.AppState {
    ngState: NameChangeState;
}

export const reducers: ActionReducerMap<NameChangeState> = {
    ng: reducer
};


export const selectNameChangeState = createFeatureSelector<AppState, NameChangeState>('ngState');
export const getNameChangeState = createSelector(selectNameChangeState, (state: NameChangeState) => state.ng);

export const getName = createSelector(getNameChangeState, (state: State) => state.name);

