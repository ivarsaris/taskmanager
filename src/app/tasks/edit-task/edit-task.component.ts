import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { task_statuses } from '../task.parts.list';
import { task_priorities } from '../task.parts.list';
import { users_list } from '../../users/users.list';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {

  private tasksService = inject(TasksService);
  currentTaskToEdit: Task | undefined = undefined;
  private taskSubscription!: Subscription;
  task_statuses = task_statuses;
  task_priorities = task_priorities;
  users_list = users_list;

  // set viewchild on input elements to get their values
  @ViewChild('taskNameInput') taskNameInput!: ElementRef;
  @ViewChild('taskDescriptionInput') taskDescriptionInput!: ElementRef;
  @ViewChild('taskStatusInput') taskStatusInput!: ElementRef;
  @ViewChild('taskDateDeadlineInput') taskDateDeadlineInput!: ElementRef;
  @ViewChild('taskPriorityInput') taskPriorityInput!: ElementRef;
  @ViewChild('taskAssigneeInput') taskAssigneeInput!: ElementRef;
  
  ngOnInit() {
    this.taskSubscription = this.tasksService.currentTaskToEdit$.subscribe(task => {
      this.currentTaskToEdit = task;
      console.log(task);
    });
  }

  editOpenTask() {
    const taskName = this.taskNameInput.nativeElement.value;
    const taskDescription = this.taskDescriptionInput.nativeElement.value;
    const taskStatus = this.taskStatusInput.nativeElement.value;
    const taskDateDeadline = this.taskDateDeadlineInput.nativeElement.value;
    const taskPriority = this.taskPriorityInput.nativeElement.value;
    const taskAssignee = Number(this.taskAssigneeInput.nativeElement.value);
    const taskId = this.currentTaskToEdit!.id;
    const taskDateCreated = this.currentTaskToEdit!.date_created;

    const newTask: Task = {
      id: taskId,
      assignee_id: taskAssignee,
      title: taskName,
      description: taskDescription,
      date_created: taskDateCreated,
      date_deadline: taskDateDeadline,
      priority: taskPriority,
      status: taskStatus
    }

    this.tasksService.editOpenTask(newTask);
  }
}
