import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { config } from 'src/app/app.config';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/app.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: Observable<any[]>;
  myTask: string;
  editMode: boolean = false;
  taskToEdit: any = {};
  isShow = false;

  constructor(private todoService: TodoService, private db: AngularFirestore) {}

  ngOnInit() {
    this.tasks = this.db
      .collection(config.collection_endpoint)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  edit(task) {
    console.log(task);
    this.taskToEdit = task;
    this.editMode = true;
    this.myTask = task.description;
  }

  saveTask() {
    if (this.myTask !== null) {
      let task = {
        description: this.myTask,
      };

      if (!this.editMode) {
        console.log(task);
        this.todoService.addTask(task);
      } else {
        let taskId = this.taskToEdit.id;
        this.todoService.updateTask(taskId, task);
      }

      this.editMode = false;
      this.myTask = '';
    }
  }

  deleteTask(task) {
    let taskId = task.id;
    this.todoService.deleteTask(taskId);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}
