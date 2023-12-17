import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../interfaces/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private editTodoSource = new BehaviorSubject<Todo | null>(null);
  currentTodoToEdit = this.editTodoSource.asObservable();

  constructor() {}

  changeTodoToEdit(todo: Todo | null) {
    this.editTodoSource.next(todo);
  }
}
