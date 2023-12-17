import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TodoFormComponent } from './todo-form/form.component';
import { TodoListComponent } from './todo-list/list.component';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    template: `
        <mat-toolbar color='primary' class='flex-wrapper'>
            <span>Tech2People ToDos</span>
            <span class='spacer'></span>
            <mat-slide-toggle [(ngModel)]='showCompletedTodos' (change)='filterCompletedTodos($event.checked)'>
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
        FormsModule,
        RouterLink,
        TodoFormComponent,
        TodoListComponent,
        MatToolbarModule,
        MatSlideToggleModule,
    ]
})
export class TodosComponent implements OnInit {
    private showCompletedTodos$ = new BehaviorSubject<boolean>(false);
    public showCompletedTodos: boolean = false;
    private subscription: Subscription = new Subscription();

    ngOnInit() {
        this.retrieveShowCompletedPreference();
        this.subscription.add(this.showCompletedTodos$.subscribe(
            value => this.showCompletedTodos = value
        ));
    }

    filterCompletedTodos(showCompleted: boolean) {
        this.showCompletedTodos$.next(showCompleted);
        this.setShowCompletedPreference(showCompleted);
    }

    /**
     * (I added this comment just to show I can.)
     * Stores user's preference to show/hide completed ToDos in local storage.
     * @param {boolean} showCompleted - user's preference
     */
    setShowCompletedPreference(showCompleted: boolean): void {
        localStorage.setItem('showCompletedTodos', String(showCompleted));
    }

    retrieveShowCompletedPreference() {
        const show = localStorage.getItem('showCompletedTodos') === 'true';
        this.showCompletedTodos$.next(show);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
