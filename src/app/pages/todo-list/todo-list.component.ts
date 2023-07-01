import { Component, OnInit } from '@angular/core';
export interface DataSource {
  name: string;
  id: number;
  location: string;
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'location', 'actions'];
  dataSource: DataSource[] = [];
  ngOnInit(): void {
    this.dataSource = [{ id: 1, name: 'arun', location: 'Hyderabad' }];
  }
}
