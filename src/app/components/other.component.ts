
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-other',
    template: `
    <div class='comp-container'>
            <a [routerLink]='["/todos"]'>Link to ToDos</a>
            <h1 class='page-title'>Some other page</h1>
        </div>
    `,
    standalone: true,
    imports: [RouterLink]
})
export class OtherComponent { }