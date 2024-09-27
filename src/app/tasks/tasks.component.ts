import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { type Task } from './task.model';
import { tasks_list } from './tasks.list';
import { task_statuses } from './task.parts.list';
import { task_priorities } from './task.parts.list';
import { task_filter_components } from './task.parts.list';
import { users_list } from '../users/users.list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})

export class TasksComponent {
  tasks_list = tasks_list;
  task_statuses = task_statuses;
  task_priorities = task_priorities;
  users_list = users_list;
  selectedUserId: number = -1;
  tasksToDisplay = this.tasks_list;

  getTasksByStatus(status: string) {
    return this.tasksToDisplay.filter(task => task.status === status);
  }

  getUserById(id: number) {
    const user = this.users_list.find(user => user.id === id);
    return user?.name;
  }

  filterTasksByUser(event: any) {
    const id = Number(event.target.value);
    this.selectedUserId = id;

    if (id === -1) {
      this.tasksToDisplay = this.tasks_list;
    } else {
      this.tasksToDisplay = this.tasks_list.filter(task => task.assignee_id === id);
    }
  }
}
