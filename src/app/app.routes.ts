import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos.component';
import { OtherComponent } from './components/other.component';

export const routes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full' },
    { path: 'todos', component: TodosComponent },
    { path: 'other', component: OtherComponent },
];

