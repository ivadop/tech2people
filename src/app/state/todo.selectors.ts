import { createSelector } from '@ngrx/store';

export const selectAppState = (state: any) => state.app;

export const getAllTodos = createSelector(
  selectAppState,
  (appState) => appState.todos
);