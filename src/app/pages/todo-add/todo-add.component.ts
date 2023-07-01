import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent implements OnInit {
  isEdited = false;
  selectedId!: number;
  todoForm!: FormGroup;
  @ViewChild('todoFormDir') todoFormDir!: NgForm;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _fb: FormBuilder,
    public router: Router,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    const state: any = this.router.getCurrentNavigation()?.extras.state;
    console.log(state);
  }
  ngOnInit(): void {
    this.todoForm = this._fb.group({
      id: [],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.isEdited = params['type'] === 'edit';
      this.selectedId = params['id'];      
    });
    if(this.isEdited){
      let selectedRecord: any = {};
      this.dataService.todos.filter(
        (item) =>
          (selectedRecord = item.id == this.selectedId ? item : selectedRecord)
      );
      this.todoForm.patchValue({
        id: this.selectedId,
        name: selectedRecord.name,
        location: selectedRecord.location,
      });
    }
  }
  get controls() {
    return this.todoForm.controls;
  }
  onSubmit() {
    let msg = 'Record has been added!';
    if (this.todoForm.valid) {
      if(!this.isEdited){
        this.dataService.createRecord(this.todoForm.value);
      }else{
        this.dataService.editRecord(this.todoForm.value);
        msg = 'Record has been edited!';
      }
      this.todoForm.reset();
      this.todoFormDir.resetForm();
      this.openSnackBar(msg, 'Success');
      setTimeout(() => {
        this.router.navigate(['list']);
      }, 200);
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
