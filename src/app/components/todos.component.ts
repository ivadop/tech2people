import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TodoFormComponent } from './todo-form/form.component';
import { TodoListComponent } from './todo-list/list.component';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    template: `
        <div class='comp-container'>
            <div class='flex-wrapper'>
                <a [routerLink]='["/other"]'>Link to some other page</a>
                    <mat-slide-toggle [(ngModel)]='showCompletedTodos' (change)='filterCompletedTodos($event.checked)'>
                <span>Show Completed</span>
            </mat-slide-toggle>
            </div>
            <app-form></app-form>
            <app-list [showCompleted]='showCompletedTodos'></app-list>
        </div>
    `,
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        TodoFormComponent,
        TodoListComponent,
        MatSlideToggleModule,
    ]
})
export class TodosComponent implements OnInit, OnDestroy {
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
