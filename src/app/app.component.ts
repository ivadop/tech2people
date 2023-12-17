import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TodosComponent } from './components/todos.component';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [
    RouterModule,
    TodosComponent,
  ]
})
export class AppComponent {}

