import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  template: `
    <div class='list-container'>LIST</div>
  `,
  styles: [
    '.list-container { height: 25%; padding: 32px; }'
    ],
  standalone: true,
  imports: [CommonModule]
})
export class ListComponent {
  @Input() items: string[] = [];
}
