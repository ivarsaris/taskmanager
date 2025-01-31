import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from '../department.model';
import { User } from '../../users/user.model';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-detailed-department',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './detailed-department.component.html',
  styleUrl: './detailed-department.component.scss'
})
export class DetailedDepartmentComponent {
  private departmentService = inject(DepartmentsService);

  private departmentSubscription!: Subscription;
  currentDepartmentToView: Department | undefined = undefined;

  private currentDepartmentUsersSubscription!: Subscription;
  currentDepartmentUsers: User[] | undefined = undefined;

  ngOnInit() {
    this.departmentSubscription = this.departmentService.currentDepartment$.subscribe(department => {
      this.currentDepartmentToView = department;
    });

    this.currentDepartmentUsersSubscription = this.departmentService.currentDepartmentUsers$.subscribe(users => {
      this.currentDepartmentUsers = users;
    });
  }
}
