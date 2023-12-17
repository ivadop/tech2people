import { Component } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  /**
   * I didn't want to focus on this component,
   * and that is why all is jumbled inside one file.
   */
  selector: 'app-root',
  template: `
  <mat-toolbar color='primary' class='flex-wrapper'>
    <span>Tech2People ToDos</span>
    <span class='spacer'></span>
    <mat-slide-toggle (change)='filterCompletedTodos($event.checked)'>
      <span class='color-white'>Show Completed</span>
    </mat-slide-toggle>
  </mat-toolbar>

  <div class='app-container'>
    <app-form></app-form>
    <app-list [showCompleted]='showCompletedTodos'></app-list>
  </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      gap: calc(3 * var(--space-xlarge));
      padding: var(--space-base);
      padding-top: var(--space-xlarge);
    }
  `],
  standalone: true,
  imports: [
    FormComponent,
    ListComponent,
    MatToolbarModule,
    MatSlideToggleModule
  ]
})
export class AppComponent {
  showCompletedTodos = false;

  filterCompletedTodos(showCompleted: boolean) {
    this.showCompletedTodos = showCompleted;
  }
}

