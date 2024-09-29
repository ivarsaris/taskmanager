import { NgFor } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { task_statuses } from '../task.parts.list';
import { task_priorities } from '../task.parts.list';
import { users_list } from '../../users/users.list';
import { tasks_list } from '../tasks.list';
import { type Task } from '../task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [NgFor],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  // declare variables from imports
  task_statuses = task_statuses;
  task_priorities = task_priorities;
  users_list = users_list;
  tasks_list = tasks_list;

  // set viewchild on input elements to get their values
  @ViewChild('taskNameInput') taskNameInput!: ElementRef;
  @ViewChild('taskDescriptionInput') taskDescriptionInput!: ElementRef;
  @ViewChild('taskStatusInput') taskStatusInput!: ElementRef;
  @ViewChild('taskDateDeadlineInput') taskDateDeadlineInput!: ElementRef;
  @ViewChild('taskPriorityInput') taskPriorityInput!: ElementRef;
  @ViewChild('taskAssigneeInput') taskAssigneeInput!: ElementRef;
  @ViewChild('newTaskModal') newTaskModal!: ElementRef;
  @ViewChild('newTaskForm') newTaskForm!: HTMLFormElement;

  /**
   * creates a new Task and adds it to the tasks.list array
   */
  createNewTask() {
    console.log(this.tasks_list);
    const taskName = this.taskNameInput.nativeElement.value;
    const taskDescription = this.taskDescriptionInput.nativeElement.value;
    const taskStatus = this.taskStatusInput.nativeElement.value;
    const taskDateDeadline = this.taskDateDeadlineInput.nativeElement.value;
    const taskPriority = this.taskPriorityInput.nativeElement.value;
    const taskAssignee = Number(this.taskAssigneeInput.nativeElement.value);
    const currentDate = this.getCurrentDate();
    // get task with highest ID and add 1
    const newTaskId = Math.max(...this.tasks_list.map(task => task.id)) + 1;

    const newTask: Task = {
      id: newTaskId,
      assignee_id: taskAssignee,
      title: taskName,
      description: taskDescription,
      date_created: currentDate,
      date_deadline: taskDateDeadline,
      priority: taskPriority,
      status: taskStatus
    }

    this.tasks_list.push(newTask);
    this.clearNewTaskForm();
    console.log(this.tasks_list);
  }

  /**
   * 
   * @returns today's date in yyyy-mm-dd format
   */
  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   * TO DO: clear form using .reset()
   */
  clearNewTaskForm() {
    // this.newTaskForm.reset();
  }
}
