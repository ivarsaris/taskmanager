import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, TasksComponent, DepartmentsComponent, RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) {}

  getCurrentRoute() {
    switch (this.router.url) {
      case '/tasks':
        return 'tasks';
        break;
      case '/users':
        return 'users';
        break;
      case '/departments':
        return 'departments';
        break;
      default:
        return '';
    }
  }

  title = 'taskmanager';
}
