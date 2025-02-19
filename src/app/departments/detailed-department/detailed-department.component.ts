import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from '../department.model';
import { User } from '../../users/user.model';
import { DepartmentsService } from '../departments.service';
import { TasksService } from '../../tasks/tasks.service';
import { Task } from '../../tasks/task.model';

@Component({
  selector: 'app-detailed-department',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './detailed-department.component.html',
  styleUrl: './detailed-department.component.scss'
})
export class DetailedDepartmentComponent {
  private departmentService = inject(DepartmentsService);
  private tasksService = inject(TasksService);

  private departmentSubscription!: Subscription;
  currentDepartmentToView: Department | undefined = undefined;

  private currentDepartmentUsersSubscription!: Subscription;
  currentDepartmentUsers: User[] | undefined = undefined;

  private currentDepartmentTasksSubscription!: Subscription;
  currentDepartmentTasks: Task[] | undefined = undefined;

  ngOnInit() {
    this.departmentSubscription = this.departmentService.currentDepartment$.subscribe(department => {
      this.currentDepartmentToView = department;
    });

    this.currentDepartmentUsersSubscription = this.departmentService.currentDepartmentUsers$.subscribe(users => {
      this.currentDepartmentUsers = users;
    });

    this.currentDepartmentTasksSubscription = this.departmentService.currentDepartment$.subscribe(department => {
      if (department) {
        this.currentDepartmentTasks = this.tasksService.getTasksByDepartment(department.id);
      }
    });
  }
}
