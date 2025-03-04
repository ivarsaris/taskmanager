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
      case '/login':
        return 'login';
        break;
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

  /**
   * log user out
   */
  logOutUser() {
    localStorage.removeItem('taskmanager_loggedIn');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 1000);
  }

  /**
   * empty local storage values, users, department, and tasks
   */
  emptyLocalStorage() {
    localStorage.removeItem('taskmanager_departments');
    localStorage.removeItem('taskmanager_users');
    localStorage.removeItem('taskmanager_tasks');
    localStorage.removeItem('taskmanager_loggedIn');

    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
