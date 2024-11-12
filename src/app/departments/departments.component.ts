import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Department } from './department.model';
import { department_list } from './departments.list';
import { DepartmentsService } from './departments.service';
import { NewDepartmentComponent } from './new-department/new-department.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [NgFor, NewDepartmentComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
  private departmentsService = inject(DepartmentsService);

  department_list = this.departmentsService.department_list;

  setDepartmentToView(id: number) {

  }
}
