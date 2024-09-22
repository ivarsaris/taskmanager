import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { type Task } from './task.model';
import { tasks_list } from './tasks.list';
import { task_statuses } from './task.parts.list';
import { task_priorities } from './task.parts.list';
import { users_list } from '../users/users.list';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})

export class TasksComponent {
  tasks_list = tasks_list;
  task_statuses = task_statuses;
  task_priorities = task_priorities;
  users_list = users_list;


  getTasksByStatus(status: string) {
    return this.tasks_list.filter(task => task.status === status);
  }

  getUserById(id: number) {
    const user = this.users_list.find(user => user.id === id);
    return user?.name;
  }
}
