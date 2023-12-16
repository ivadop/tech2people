import { createReducer, on } from '@ngrx/store';
import { addItem } from './actions';
import { AppState, initialState } from './state';

export const appReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  }))
);
