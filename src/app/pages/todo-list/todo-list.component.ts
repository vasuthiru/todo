import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
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
  dataSource!: DataSource[];
  constructor(private router: Router, private dataService: DataService){}
  ngOnInit(): void {
    this.dataSource = this.dataService.todos;
    console.log(this.dataSource, 'sdfdsf')
  }
  editRecord(record: any) {
    const navigationExtras: NavigationExtras = { state: { record: record } };
    this.router.navigate(['/add-list'],{queryParams: {type:'edit', id: record.id}});
  }
}
