import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskmanager';
}
