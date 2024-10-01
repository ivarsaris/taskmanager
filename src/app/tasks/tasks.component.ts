import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { type Task } from './task.model';
import { tasks_list } from './tasks.list';
import { task_statuses } from './task.parts.list';
import { task_priorities } from './task.parts.list';
import { task_filter_components } from './task.parts.list';
import { users_list } from '../users/users.list';
import { FormsModule } from '@angular/forms';
import { TasksService } from './tasks.service';
import { NewTaskComponent } from './new-task/new-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, FormsModule, NewTaskComponent, EditTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})

export class TasksComponent {

  private tasksService = inject(TasksService);

  tasks_list = this.tasksService.tasks_list;
  filtered_tasks_list = this.tasksService.tasks_list;
  task_statuses = this.tasksService.task_statuses;
  task_priorities = this.tasksService.task_priorities;
  task_filter_components = this.tasksService.task_filter_components;
  users_list = this.tasksService.users_list;
  selectedUserId = -1;
  sortValue = '';
  selectedUserName = '';
  
  getTasksByStatus(status: string) {
    return this.tasksService.getTasksByStatus(status);
  }

  getUserById(id: number) {
    return this.tasksService.getUserById(id);
  }

  filterAndSortTasks() {
    this.tasksService.filterAndSortTasks(this.selectedUserId, this.sortValue);
    this.selectedUserName = this.tasksService.selectedUserName;
  }

  setTaskToEdit(id: number) {
    this.tasksService.setTaskToEdit(id);
  }

  // sortByDate(dateType: keyof Task) {
  //   return this.tasksService.sortByDate(dateType);
  // }
}
