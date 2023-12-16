import { createAction, props } from '@ngrx/store';

export const addItem = createAction('[List] Add Item', props<{ item: string }>());
