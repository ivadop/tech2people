import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from '../interfaces/todo.model';

export const todoFeatureKey = 'todo';

export interface State {
  todos: Todo[];
}

export const initialState: State = {
  todos: [ // These are just to have some mocked up in the past:
    {
      id: 'id_1702803294124',
      title: 'Not completed in the past with a very long title',
      deadline: new Date('Wed Dec 10 2023 00:00:00 GMT+0100'),
      completed: false
    },
    {
      id: 'id_1702803300039',
      title: 'Completed in the past',
      deadline: new Date('Wed Dec 05 2023 00:00:00 GMT+0100'),
      completed: true
    },
  ]
};


export const todoReducer = createReducer(
  initialState,

  on(TodoActions.addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo]
  })),

  on(TodoActions.deleteTodo, (state, { id }) => {
    const todos = [...state.todos];
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    return {
      ...state,
      todos: todos
    };
  }),

  on(TodoActions.toggleTodoCompleted, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),

  on(TodoActions.updateTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(item => item.id === todo.id ? todo : item)
  })),
);
