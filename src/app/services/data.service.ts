import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
export interface Todo {
  id: number;
  name: string;
  location: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _todo$ = new Subject<Todo[]>();
  readonly todos$ = this._todo$.asObservable();

  public todos: Todo[] = [];
  private nextId = 0;
  constructor() {}

  createRecord(item: Todo) {
    item.id = ++this.nextId;

    //Update database
    this.todos.push(item);
    this._todo$.next(Object.assign([], this.todos));
  }

  deleteRecord(id: number) {
    this.todos.forEach((t, i) => {
      if (t.id === id) {
        this.todos.splice(i, 1);
      }
      this._todo$.next(Object.assign([], this.todos));
    });
  }
}
