import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TodoFormComponent } from './todo-form/form.component';
import { TodoListComponent } from './todo-list/list.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-todo',
    template: `
        <mat-toolbar color='primary' class='flex-wrapper'>
            <span>Tech2People ToDos</span>
            <span class='spacer'></span>
            <mat-slide-toggle (change)='filterCompletedTodos($event.checked)'>
                <span class='color-white'>Show Completed</span>
            </mat-slide-toggle>
        </mat-toolbar>

        <div class='app-container'>
            <a [routerLink]='["/other"]'>Link to some other page</a>
            <app-form></app-form>
            <app-list [showCompleted]='showCompletedTodos'></app-list>
        </div>
    `,
    styles: [`
        .app-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-xlarge);
        padding: var(--space-base);
        padding-top: var(--space-xlarge);
        }
    `],
    standalone: true,
    imports: [
        RouterLink,
        TodoFormComponent,
        TodoListComponent,
        MatToolbarModule,
        MatSlideToggleModule
    ]
})
export class TodosComponent {
    showCompletedTodos = false;

    filterCompletedTodos(showCompleted: boolean) {
        this.showCompletedTodos = showCompleted;
    }
}
