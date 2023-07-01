import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoAddRoutingModule } from './todo-add-routing.module';
import { TodoAddComponent } from './todo-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [TodoAddComponent],
  imports: [
    CommonModule,
    TodoAddRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ]
})
export class TodoAddModule { }
