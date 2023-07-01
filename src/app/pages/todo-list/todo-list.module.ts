import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
@NgModule({
  declarations: [TodoListComponent],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class TodoListModule { }
