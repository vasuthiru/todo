import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent implements OnInit {
  todoForm!: FormGroup;
  @ViewChild('todoFormDir') todoFormDir!: NgForm;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _fb: FormBuilder,
    public router: Router,
    private dataService: DataService,
    private _snackBar: MatSnackBar
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
  }
  get controls() {
    return this.todoForm.controls;
  }
  onSubmit() {
    if (this.todoForm.valid) {
      this.dataService.createRecord(this.todoForm.value);
      this.todoForm.reset();
      this.todoFormDir.resetForm();
      const msg = 'Record has been added!';
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
      duration: 5000
    });
  }
}
