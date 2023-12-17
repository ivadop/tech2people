import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';

import { provideStore } from '@ngrx/store';
import { todoReducer } from './app/state/todo.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    BrowserAnimationsModule,
    provideStore({ app: todoReducer }),
    provideRouter(routes),
    BrowserModule,
  ]
}).catch(err => console.error(err));
