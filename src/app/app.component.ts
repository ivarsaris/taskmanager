import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, TasksComponent, NewTaskComponent, EditTaskComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskmanager';
}
