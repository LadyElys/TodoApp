import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: firebase.User;
  //todos$: AngularFireList<any>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private af: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.auth.getUserState().subscribe(user => {
      this.user = user;
    });

    //this.todos$ = this.af.list('/todos');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  /*addTodo(value: string): void {
    this.todos$.push({ content: value, done: false});
  }

  deleteTodo(todo: any): void {
    this.af.object('/todos/' + todo.$key).remove();
  }

  toggleDone(todo: any): void {
    this.af
      .object('/todos/' + todo.$key)
      .update({ content: todo.content, done: !todo.done });
  }

  updateTodo(todo: any, newValue: string): void {
    this.af
      .object('/todos/' + todo.$key)
      .update({ content: newValue, done: todo.done });
  }*/

}
