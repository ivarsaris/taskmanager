import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from './department.model';
import { department_list } from './departments.list';
import { DepartmentsService } from './departments.service';
import { DetailedDepartmentComponent } from './detailed-department/detailed-department.component';
import { NewDepartmentComponent } from './new-department/new-department.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [NgFor, NewDepartmentComponent, DetailedDepartmentComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {

  private departmentsService = inject(DepartmentsService);
  private departmentListSubscription!: Subscription;

  department_list: Department[] | undefined = undefined;

  ngOnInit() {
    this.departmentListSubscription = this.departmentsService.departmentList$.subscribe(departmentList => {
      this.department_list = departmentList;
    });
  }

  /**
   * 
   * @param id - id of the department
   */
  setDepartmentToView(id: number) {
    this.departmentsService.setDepartmentToView(id);
  }
}
