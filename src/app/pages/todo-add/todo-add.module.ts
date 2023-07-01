import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoAddRoutingModule } from './todo-add-routing.module';
import { TodoAddComponent } from './todo-add.component';


@NgModule({
  declarations: [TodoAddComponent],
  imports: [
    CommonModule,
    TodoAddRoutingModule
  ]
})
export class TodoAddModule { }
