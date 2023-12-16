import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  template: `
    <app-form></app-form>
    <app-list></app-list>
  `,
  standalone: true,
  imports: [FormComponent, ListComponent]
})
export class AppComponent {}

