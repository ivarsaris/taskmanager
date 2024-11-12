import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Department } from './department.model';
import { department_list } from './departments.list';


@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [NgFor],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
  department_list = department_list;

  setDepartmentToView(id: number) {

  }
}
