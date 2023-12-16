import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  template: `
    <div class='form-container'>
    <form [formGroup]="simpleForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Enter a string</mat-label>
        <input matInput formControlName="myString">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="myDate">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Enter a number</mat-label>
        <input matInput type="number" formControlName="myNumber">
      </mat-form-field>

      <button mat-raised-button color='primary' type="submit" [disabled]="!simpleForm.valid">Submit</button>
    </form>
    </div>
  `,
  styles: [
    '.form-container { height: 25%; background-color: #fceae8; padding: 32px; }'
    ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class FormComponent {
    simpleForm = new FormGroup({
        myString: new FormControl('', Validators.required),
        myDate: new FormControl('', Validators.required),
        myNumber: new FormControl('', [Validators.required, Validators.pattern('\\d+')])
      });

      onSubmit() {
        console.log(this.simpleForm.value);
      }
}
