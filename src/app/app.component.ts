import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TodosComponent } from './components/todos.component';

@Component({
    selector: 'app-root',
    template: `
    <mat-toolbar color='primary'>
        <span>Tech2People ToDos</span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
    standalone: true,
    imports: [
        RouterModule,
        TodosComponent,
        MatToolbarModule,
    ]
})
export class AppComponent { }

