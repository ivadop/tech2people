
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-other',
  template: `
      <h1>Some other page</h1>
      <a [routerLink]='["/todos"]'>Link to ToDos</a>
    `,
  standalone: true,
  imports: [RouterLink]
})
export class OtherComponent { }