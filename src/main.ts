import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';

import { provideStore } from '@ngrx/store';
import { todoReducer } from './app/state/todo.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    BrowserAnimationsModule,
    provideStore({ app: todoReducer }),
  ]
}).catch(err => console.error(err));
