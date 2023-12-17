import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Todo } from '../../interfaces/todo.model';
import * as TodoActions from '../../state/todo.actions';
import { getAllTodos } from '../../state/todo.selectors';

import { TodoService } from '../../services/todo.service';
import { tap, map, startWith } from 'rxjs/operators';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        MatCheckboxModule]
})

export class TodoListComponent implements OnInit, OnChanges {
    @Input() showCompleted: boolean = false;
    public todos$: Observable<Todo[]> = this.store.select(getAllTodos);
    private showCompletedSource = new BehaviorSubject<boolean>(false);
    private showCompleted$ = this.showCompletedSource.asObservable();

    constructor(
        private store: Store<{ todos: Todo[] }>,
        private todoService: TodoService,
    ) { }

    ngOnInit() {
        this.todos$ = combineLatest([
            this.store.pipe(select(getAllTodos)),
            this.showCompleted$.pipe(startWith(this.showCompleted))
        ]).pipe(
            map(([todos, showCompleted]) => {
                return todos ? (showCompleted ? todos : todos.filter((todo: Todo) => !todo.completed)) : [];
            }),
            tap(todos => console.log('Current todos:', todos))
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['showCompleted']) {
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
        today.setHours(0, 0, 0, 0);

        let resetTodoDate = new Date(todoDate);
        resetTodoDate.setHours(0, 0, 0, 0);

        return resetTodoDate < today;
    }
}
