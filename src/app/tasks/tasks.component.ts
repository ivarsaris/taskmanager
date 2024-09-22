import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { type Task } from './task.model';
import { tasks_list } from './tasks.list';
import { task_statuses } from './task.parts.list';
import { task_priorities } from './task.parts.list';

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


  getTasksByStatus(status: string) {
    return this.tasks_list.filter(task => task.status === status);
  }
}
