import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appReducer } from './app/state/reducer';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ app: appReducer }),
    BrowserAnimationsModule,
  ]
});
