import { createAction, props } from '@ngrx/store';
import { Todo } from '../interfaces/todo.model';

export const addTodo = createAction(
    '[Form] Create Todo',
    props<{ todo: Todo }>()
);

export const deleteTodo = createAction(
    '[Todo] Delete Todo',
    props<{ id: string }>()
);

export const updateTodo = createAction(
    '[Todo] Update Todo',
    props<{ todo: Todo }>()
);

export const toggleTodoCompleted = createAction(
    '[Todo] Toggle Todo Completed',
    props<{ id: string }>()
);