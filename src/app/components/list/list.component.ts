import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Todo } from '../../interfaces/todo.model';
import * as TodoActions from '../../state/todo.actions';

import { TodoService } from '../../services/todo.service';
import { tap, map, startWith } from 'rxjs/operators';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-list',
  template: `
  <div class='comp-container'>
    <mat-list>
      @for (item of todos$ | async; track item.title) {
        <div class='flex-wrapper'>
        <mat-checkbox color='primary' [checked]='item.completed' (change)='toggleCompleted(item.id)'></mat-checkbox>
        <mat-list-item>
            <span matListItemTitle>
              {{ item.title | uppercase }}
            </span>
            @if (isBeforeToday(item.deadline)) {
              <span matListItemLine class='color-warn'>
                {{ item.deadline | date:'mediumDate' }}
              </span>
            } @else {
              <span matListItemLine>
                {{ item.deadline | date:'mediumDate' }}
              </span>
            }
          </mat-list-item>
          <span class='flex-wrapper'>
            <button mat-icon-button color='primary' (click)='editTodo(item)' aria-label='Example icon button with a home icon'>
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color='primary' (click)='deleteTodo(item.id)' aria-label='Example icon button with a home icon'>
              <mat-icon>close</mat-icon>
            </button>
          </span>
        </div>
        @if (!$last) {
          <mat-divider [inset]='false'></mat-divider>
        }
      } @empty {
        <mat-list-item>All ToDos completed! Hooray!</mat-list-item>
      }
    </mat-list>
  </div>
  `,
  styles: [`
    span:not(:last-child) {
      margin-right: var(--space-large);
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule]
})

export class ListComponent implements OnInit, OnChanges {
  @Input() showCompleted: boolean = false;
  public todos$: Observable<Todo[]> = this.store.select(state => state.todos);
  private showCompletedSource = new BehaviorSubject<boolean>(false);
  private showCompleted$ = this.showCompletedSource.asObservable();

  constructor(
    private store: Store<{ todos: Todo[] }>,
    private todoService: TodoService,
    ) {}

  ngOnInit() {
    this.todos$ = combineLatest([
      this.store.pipe(select((state: any) => state.app.todos)),
      this.showCompleted$.pipe(startWith(this.showCompleted))
    ]).pipe(
      map(([todos, showCompleted]) => {
        console.log('Filtering todos, showCompleted:', showCompleted);
        return showCompleted ? todos : todos.filter((todo: Todo) => !todo.completed);
      }),
      tap(todos => console.log('Current todos:', todos))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showCompleted']) {
      console.log('showCompleted changed:', this.showCompleted);
      this.showCompletedSource.next(this.showCompleted);
    }
  }

  deleteTodo(id: string) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  editTodo(todo: Todo) {
    this.todoService.changeTodoToEdit(todo);
  }

  toggleCompleted(id: string) {
    this.store.dispatch(TodoActions.toggleTodoCompleted({ id }));
  }

  isBeforeToday(todoDate: Date): boolean {
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's time to 00:00:00

    let resetTodoDate = new Date(todoDate);
    resetTodoDate.setHours(0, 0, 0, 0); // Reset todo date's time to 00:00:00

    return resetTodoDate < today;
  }
}
