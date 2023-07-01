import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
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
export class TodoListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'location', 'actions'];
  dataSource!: DataSource[];
  @ViewChild(MatTable) table!: MatTable<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private router: Router, private dataService: DataService, private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.dataSource = this.dataService.todos;
  }
  editRecord(record: DataSource) {
    const navigationExtras: NavigationExtras = { state: { record: record } };
    this.router.navigate(['/add-list'],{queryParams: {type:'edit', id: record.id}});
  }
  deleteRecord(record:DataSource){
    this.dataService.deleteRecord(record.id);
    this.table.renderRows();
    const msg = 'Record has been deleted!!';
    this.openSnackBar(msg, 'Success')
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
