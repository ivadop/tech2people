import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { futureDateValidator } from '../../validators/future-date-validator';
import { alphanumericValidator } from '../../validators/alphanumeric-validator';
import { Store } from '@ngrx/store';
import * as TodoActions from '../../state/todo.actions';
import { Todo } from '../../interfaces/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule
    ]
})

export class TodoFormComponent implements OnInit {
    private editingTodo: Todo | null = null;
    public isButtonDisabled = true;

    constructor(
        private store: Store,
        private todoService: TodoService,
    ) { }

    ngOnInit() {
        this.todoForm.statusChanges.subscribe(status => {
            this.isButtonDisabled = status !== 'VALID';
        });

        this.todoService.currentTodoToEdit.subscribe(todo => {
            if (todo) {
                this.editingTodo = todo;
                this.todoForm.setValue({
                    title: todo.title,
                    deadline: todo.deadline.toISOString().substring(0, 10)
                });
            } else {
                this.todoForm.reset();
                this.editingTodo = null;
            }
        });
    }

    todoForm = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            // Validators.pattern(/^[a-zA-Z0-9 ]*$/) // Alphanumeric regex pattern
            alphanumericValidator()
        ]),
        deadline: new FormControl('', [
            Validators.required,
            futureDateValidator() // Custom validator chacks if date is set in the future
        ]),
    });

    onSubmit(formDirective: any) {
        if (this.todoForm.valid) {
            const formValue = this.todoForm.value;
            const title = formValue.title as string;
            const deadline = new Date(formValue.deadline as string);

            if (this.editingTodo) { // Editing existing todo
                const updatedTodo: Todo = {
                    ...this.editingTodo,
                    title,
                    deadline,
                };
                this.store.dispatch(TodoActions.updateTodo({ todo: updatedTodo }));
            } else { // Adding new todo
                const newTodo: Todo = {
                    id: `id_${new Date().getTime()}`, // Not a good idea in the real app
                    title,
                    deadline,
                    completed: false
                };
                this.store.dispatch(TodoActions.addTodo({ todo: newTodo }));
            }
            this.resetForm();
            formDirective.resetForm();
            this.isButtonDisabled = true;
        }
    }

    resetForm() {
        this.todoForm.reset({
            title: null,
            deadline: null,
        });

        Object.keys(this.todoForm.controls).forEach(key => {
            const control = this.todoForm.get(key);
            control?.markAsPristine();
            control?.markAsUntouched();
        });

        this.editingTodo = null;
        this.isButtonDisabled = true;
    }
}
